import {CHANGE_FORM_FIELD, FETCH_ORDER_REQUEST, GET_CART_ITEMS_SUCCESS, SET_CART_TOTAL} from "../actions/actionTypes"

const useActionTypes = [GET_CART_ITEMS_SUCCESS, CHANGE_FORM_FIELD, SET_CART_TOTAL, FETCH_ORDER_REQUEST];

export const persistMiddleware = (storeApi) => (next) => (action) => {
  if (useActionTypes.includes(action.type)) {
    const cartData = storeApi.getState()['cart']
    window.localStorage.setItem("cart", JSON.stringify(cartData));
  }

  return next(action);
};
