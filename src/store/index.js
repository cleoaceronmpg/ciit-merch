import storage from "redux-persist/lib/storage";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import * as types from "./actions";
import logger from "./logger";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["authentication", "app", "cart", "profile"],
  timeout: null,
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, logger)
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const actionCreator = (props) => props;

export { store, persistor, types, actionCreator };
