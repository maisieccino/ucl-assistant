import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import app, { initialState } from "./reducers";

const middleware = [createDebounce(), thunk];

const config = {
  key: "root",
  storage,
  debug: __DEV__,
};

const reducer = persistCombineReducers(config, app);

export default () => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware),
  );
  const persistor = persistStore(store, null, () => {
    store.getState();
  });

  return { persistor, store };
};
