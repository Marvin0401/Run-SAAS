import axios from "axios";

const defaultClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const gfontsClient = axios.create({
  baseURL: "https://www.googleapis.com/webfonts/v1/",
  timeout: 10000,
});

const gatsbyClient = axios.create({
  baseURL: process.env.REACT_APP_GATSBY_API_BASE_URL,
  timeout: 1000000,
});

const clients = {
  default: {
    client: defaultClient,
  },
  gatsby: {
    client: gatsbyClient,
  },
  gfonts: {
    client: gfontsClient,
  },
};

/** Middleware to extract API error details from response */
export const thunkHandler = async (asyncFn, thunkAPI) => {
  try {
    const response = await asyncFn;
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
};

export default clients;
