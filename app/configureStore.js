import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import app from "./reducers";

const middleware = [createDebounce(), thunk];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const config = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(config, app);

export default () => {
  const store = createStoreWithMiddleware(reducer);
  const persistor = persistStore(store);

  return { persistor, store };
};
