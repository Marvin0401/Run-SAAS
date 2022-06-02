import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";

import reducer from "@reducers/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  middleware: customizedMiddleware,
  reducer: persistedReducer,
});

export const persistor = persistStore(store, { manualPersist: true });

export default store;
