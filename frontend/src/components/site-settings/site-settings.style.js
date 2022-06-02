import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {},
  formInput: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0)",
    "&.touched:invalid": {
      borderColor: "red",
    },
  },
  shareImageContainer: {
    display: "flex",
  },
  shareImagePreviewContainer: {
    height: "6em",
    width: "6em",
  },
  shareImagePreview: {
    height: "4.5em",
    width: "auto",
  },
  actionWrapper: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    columnGap: "0.5em",
  },
  faviconContainer: {
    display: "flex",
    "& img": {
      height: "4.5em",
      width: "4.5em",
    },
  },
});

export default useStyles;
