import urls from "../constants";
import { take, put, select } from "redux-saga/effects";
import {
  FETCH_TOPSALES_REQUEST,
  FETCH_TOPSALES_FAILURE,
  FETCH_TOPSALES_SUCCESS,
  FETCH_ITEM_REQUEST,
  SET_AVALIBLE_SIZES,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_MORE_REQUEST,
  FETCH_MORE_FAILURE,
  FETCH_MORE_SUCCESS,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
} from "../actions/actionTypes";

import { fetchItemFailure, fetchItemSuccess } from "../actions/actionCreators";

export const fetchTopSalesSaga = function* () {
  while (true) {
    yield take(FETCH_TOPSALES_REQUEST);
    try {
      const response = yield fetch(urls.topSales, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = yield response.json();

      yield put({
        type: FETCH_TOPSALES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: FETCH_TOPSALES_FAILURE,
        payload: error.message,
      });
    }
  }
};

export const fetchItemSaga = function* () {
  while (true) {
    const { payload } = yield take(FETCH_ITEM_REQUEST);
    try {
      const response = yield fetch(`${urls.items}/${payload}`, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = yield response.json();
      const filteredSizes = data.sizes.filter((item) => item.avalible);

      yield put({
        type: SET_AVALIBLE_SIZES,
        payload: filteredSizes,
      });

      yield put(fetchItemSuccess(data));
    } catch (error) {
      yield put(fetchItemFailure(error));
    }
  }
};

export const fetchCategoriesSaga = function* () {
  while (true) {
    yield take(FETCH_CATEGORIES_REQUEST);
    try {
      const response = yield fetch(urls.categories, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = yield response.json();
      console.log(data);

      yield put({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: FETCH_CATEGORIES_FAILURE,
        payload: error.message,
      });
    }
  }
};

export const fetchItemsSaga = function* () {
  while (true) {
    const { payload } = yield take(FETCH_ITEMS_REQUEST);
    try {
      const response = yield fetch(`${urls.items}?${payload}`, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = yield response.json();
      console.log(data);

      yield put({
        type: FETCH_ITEMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: FETCH_ITEMS_FAILURE,
        payload: error.message,
      });
    }
  }
};

export const fetchMoreSaga = function* () {
  while (true) {
    const { payload } = yield take(FETCH_MORE_REQUEST);
    try {
      const response = yield fetch(`${urls.items}?${payload}`, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = yield response.json();
      console.log(data);

      yield put({
        type: FETCH_MORE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: FETCH_MORE_FAILURE,
        payload: error.message,
      });
    }
  }
};

export const fetchOrderSaga = function* () {
  while (true) {
    yield take(FETCH_ORDER_REQUEST);
    const {
      cart: { cartItems, owner },
    } = yield select((state) => state);

    const items = [];
    cartItems.forEach((item) => {
      items.push({
        id: item.id,
        price: item.price,
        count: item.quantity,
      });
    });

    const body = {
      owner: {
        phone: owner.phone,
        address: owner.address,
      },
      items: items,
    };

    try {
      const response = yield fetch(`${urls.order}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      localStorage.clear();

      yield put({
        type: FETCH_ORDER_SUCCESS,
        payload: items,
      });
    } catch (error) {
      yield put({
        type: FETCH_ORDER_FAILURE,
        payload: error.message,
      });
    }
  }
};
