import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "redux-persist/es/storage";
import createSecureStore from "redux-persist-expo-securestore";
import thunk from "redux-thunk";
import persistReducer from "redux-persist/lib/persistReducer";
import debounce from "../lib/debounce";
import reducer, { initialState } from "./reducers";

const { user, ...otherReducers } = reducer;

const secureStorage = createSecureStore();

const middleware = [debounce.middleware(), thunk];

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: __DEV__,
  blacklist: ["user"],
};

const userPersistConfig = {
  key: "user",
  storage: secureStorage,
};

// const rootReducer = persistCombineReducers(config, reducer);

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, user),
  ...otherReducers,
});

const persistRootReducer = persistReducer(config, rootReducer);

export default () => {
  const store = createStore(
    persistRootReducer,
    initialState,
    applyMiddleware(...middleware),
  );
  const persistor = persistStore(store, null, () => {
    store.getState();
  });

  return { persistor, store };
};
