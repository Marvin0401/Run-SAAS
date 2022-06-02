import { SET_ERROR } from "@actions/types";

const initialState = {
  error: null,
  retry: false,
};

const reducer = (state = initialState, action) => {
  const { error, payload, type } = action;

  if (error) {
    return {
      ...state,
      error: payload,
      retry: payload?.status === 401,
    };
  }

  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    case "auth/logout":
    case "auth/refresh-token/fulfilled":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
