import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    maxHeight: "40rem",
  },
});

export default useStyles;
