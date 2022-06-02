import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  centralWrapperContainer: ({ centralWrapperScale }) => ({
    transform: `scale(${centralWrapperScale})`,
    transformOrigin: "0 0",
  }),
  previewArea: ({ previewAreaHeight }) => ({
    height: previewAreaHeight,
  }),
});

export default useStyles;
