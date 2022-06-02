import { SET_ERROR } from "./types";

export const setErrorAction = ({ error }) => ({
  type: SET_ERROR,
  error,
});
