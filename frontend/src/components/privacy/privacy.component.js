import React from "react";

import useStyles from "./privacy.style";

const Privacy = (props) => {
  const classes = useStyles(props);

  return <div className={classes.container}>Privacy</div>;
};

export default Privacy;
