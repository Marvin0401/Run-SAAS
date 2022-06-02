import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@redux/slices/auth";
import blockDataReducer from "@redux/slices/blockData";
import colorPalletsReducer from "@redux/slices/colorPallets";
import designReducer from "@redux/slices/design";
import errorReducer from "./error";
import navReducer from "@redux/slices/nav";
import profileReducer from "@redux/slices/profile";
import siteReducer from "@redux/slices/site";

const rootReducer = combineReducers({
  auth: authReducer,
  blockData: blockDataReducer,
  colorPallets: colorPalletsReducer,
  design: designReducer,
  error: errorReducer,
  nav: navReducer,
  profile: profileReducer,
  site: siteReducer,
});

export default rootReducer;
