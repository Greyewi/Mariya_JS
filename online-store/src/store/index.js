import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import topSalesReducer from "../reducers/topSales";
import catalogReducer from "../reducers/catalog";
import searchReducer from "../reducers/search";
import catalogItemReducer from "../reducers/catalogItem";
import cartReducer from "../reducers/cart";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { fetchCategoriesSaga } from "../sagas/sagas";
import { fetchTopSalesSaga } from "../sagas/sagas";
import { fetchItemSaga } from "../sagas/sagas";
import { fetchItemsSaga } from "../sagas/sagas";
import { fetchMoreSaga } from "../sagas/sagas";
import { fetchOrderSaga } from "../sagas/sagas";
import {persistMiddleware} from '../middlewares/middlewares'

// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  topSales: topSalesReducer,
  catalog: catalogReducer,
  search: searchReducer,
  catalogItem: catalogItemReducer,
  cart: cartReducer,
});

const rootSaga = function* rootSaga() {
  yield all([
    fetchCategoriesSaga(),
    fetchTopSalesSaga(),
    fetchItemSaga(),
    fetchItemsSaga(),
    fetchMoreSaga(),
    fetchOrderSaga(),
  ]);
};

const middlewares = [thunk, sagaMiddleware];

const enhancer = compose(composeWithDevTools(applyMiddleware(...middlewares)));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export { store };
