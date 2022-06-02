import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    height: "100%",
  },
  formInput: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0)",
    "&.touched:invalid": {
      borderColor: "red",
    },
  },
});

export default useStyles;
