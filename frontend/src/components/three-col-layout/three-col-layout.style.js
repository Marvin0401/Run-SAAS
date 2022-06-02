import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  centralWrapperContainer: ({ centralWrapperScale }) => ({
    transform: `scale(${centralWrapperScale})`,
    transformOrigin: "0 0",
  }),
  previewArea: ({ previewAreaHeight, isMobile }) => ({
    margin: "auto",
    height: isMobile
      ? `calc(${previewAreaHeight}px - 4rem)`
      : previewAreaHeight,
  }),
});

export default useStyles;
