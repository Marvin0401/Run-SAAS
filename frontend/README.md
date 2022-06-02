# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overrides

CRA overrides can be accomplished with the [customize-cra](https://github.com/arackaf/customize-cra) package.  Overrides currently reside in `config-overrides.js`

## Environment Setup

Project variables are established in `env-cmdrc`.  The "Local" entry is for local development.  Do not commit changes to this file for your local development.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Deployment

The project can be deployed to your own development server, a dev server, the staging server and the production server.  Deployments occur when merges
and pull requests are complete into the target branch.  Github actions are used for deployments and can be seen in the "Actions" tab on github.

**Note: There should be no merges or pull requests into `dev`, `staging` or `production` unless explicitly instructed to do so**

## Components and reducer generation
Plop is used as a templating system for components and reducers.  The script will run, ask you some basic questions, and the files will  automatically be created for you.

### Generic Component
A new component can be made by running the command `yarn generate component`

### Redux Connected Component
A new component connected to redux with useSelector hook can be made by running `yarn generate redux-component`

### Reducer
A new reducer can be made by running `yarn generate reducer`

## General Coding practices
In general, the established linter should take care of most issues, but in general:
- ES6 javascript standards
- Imports should be well organized and alphabetical
- Deconstructed variables should be alphabetical
- Comments to override the linter will be rejected
- Props shall be organized and in alphabetical order

### Naming standards
- Descriptive variable names, method names and component names are mandatory.  Someone reading your code should know exactly what it's doing purely based on names.
- In general, if a prop is calling a method, the prefix "handle" should be appended to the prop name. (i.e. prop: onClose, method name: handleOnClose)
- Readable is more important than elegant.  If a solution can be written in 1 line of elegant code that requires a trip into the JavaScript documentation to figure out, or a 3 line solution that's easy to read and understand, the 3 line solution is preferred.

## Components
Components are found in the `components` folder.  Components should  be located inside a folder with lowercase, hypenated names (i.e. nav-menu).  The file should be the same as the folder name, with `.component.js` appended to the end. (i.e. nav-menu.component.js).  If scoped style is required, [REACT-JSS](https://github.com/cssinjs/jss) is used and there should be a separate file with `.style.js` appended.

## State Management
- Redux is being used for state management, with Redux Thunk handling any asynchronous actions.
- [Axios API middleware](https://www.npmjs.com/package/redux-axios-middleware) is being used for api requests.  Actions are dispatched with a specific recipe, and if there's a `request` key in the `payload`, Axios will pick up the action and perform the request defined in the `request` key.  The middleware will then dispatch a "ACTION_TYPE_SUCCESS/ACTION_TYPE_ERROR" action with the results from the  request.  The api base url is defined in `env-cmdrc` file.

## Style
- SCSS will be used to style this project
- Component scoped style can be achieved with [REACT-JSS](https://github.com/cssinjs/jss)

## Pull Request Process
- Check your local environment before creating a pull request.  Code with compile errors will be immediately rejected.
- Prior to making a pull request, squash your commits down to one.  [Squash Commits](https://www.git-tower.com/learn/git/faq/git-squash/)
- When you are complete with your feature work, a pull request should be created comparing your feature branch to the branch instructed via the task.
- Your PR should be titled in the following manner: **TBD**
- All questions on the pull request template should be answered according to the instructions in the template

# Component Usage

## Notification Pop Up

```
import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";

const { setPopUp } = useNotificationPopUp();

// pass the props to the setPopUp
setPopUp({
  title: "Voting Starts Friday!",
  children: (
    <p>
      Voting is starting this Friday and we need everyone who can to get
      out and vote early. Click below to find out how to vote.
    </p>
  ),
  onClose: () => console.log("dialog closed")
});
```

## Simple Pop Up
```
import SimplePopUp from "@components/simple-pop-up/simple-pop-up.component";

// pass the props and content as children
  <SimplePopUp
      label="Select block"
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
    >
      <div>Custom content</div>
  </SimplePopUp>
```

## TextEditor
```
import TextEditor from "@src/components/text-editor/text-editor.component";

// pass the value and onChange for html conent
// pass toolbarOptions in arrat, avaliable options = [ "bold", "italic", "h1", "h2", "h3", "h4", "link", "list", "image" ]
// pass charLimit
// for use simple inline text editor (without toolbar) pass isSimple props, or epmty toolbarOptions
// simple text editor  can get element props (html tag) and classname

// -- FULL TEXT EDITOR WITH TOOLBAR -- // 
  <TextEditor
      value={value}
      onChange={setValue}
      toolbarOptions={ [ "bold", "italic", "h1", "h2", "h3", "h4", "link", "list", "image" ]}
      charLimit={-1}
  />

 // -- SIPMLE TEXT EDITOR -- // 
  <TextEditor
      value={value}
      onChange={setValue}
      toolbarOptions={ ["bold", "italic"]}
      charLimit={-1}
      element="h2"
      className="title" 
  />
```
