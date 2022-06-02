import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  editorContainer: {
    width: "100%",
    position: "relative",
    "& .ql-toolbar": {
      display: "none",
      border: "none",
      position: "absolute",
      top: -24,
    },
    "&.active .ql-toolbar": {
      display: "block",
      zIndex: 100000,
      fontSize: 0,
    },
    "& .ql-container": {
      display: "block",
      outlineStyle: "none",
      "&:hover": {
        outlineStyle: "dashed",
      },
      "&:focus-within": {
        outlineStyle: "dashed",
      },
    },
    "& .ql-stroke": {
      color: "white",
    },
    "& button": {
      // backgroundColor: "#656668",
    },
    "&.mw-0": {
      minWidth: 0,
    },
    minWidth: "300px",
  },
});

export default useStyles;
