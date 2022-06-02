module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: function (data) {
      var actions = [];

      if (data.addStyle) {
        actions.push({
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.component.js",
          templateFile: "plop-templates/Component.js.hbs",
        });

        actions.push({
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.style.js",
          templateFile: "plop-templates/ComponentStyle.js.hbs",
        });
      } else {
        actions.push({
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.component.js",
          templateFile: "plop-templates/ComponentNoStyle.js.hbs",
        });
      }

      return actions;
    },
  });

  plop.setGenerator("redux-component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
      {
        type: "confirm",
        name: "addStyle",
        message: "Include style files?",
      },
    ],
    actions: function (data) {
      var actions = [];

      if (data.addStyle) {
        actions.push({
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.component.js",
          templateFile: "plop-templates/ReduxComponent.js.hbs",
        });

        actions.push({
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.style.js",
          templateFile: "plop-templates/ComponentStyle.js.hbs",
        });
      } else {
        actions.push({
          type: "add",
          path: "src/components/{{dashCase name}}/{{dashCase name}}.component.js",
          templateFile: "plop-templates/ReduxComponentNoStyle.js.hbs",
        });
      }

      return actions;
    },
  });

  plop.setGenerator("reducer", {
    description: "Create a reducer",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your reducer name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/redux/reducers/{{name}}.js",
        templateFile: "plop-templates/Reducer.js.hbs",
      },
    ],
  });
};
