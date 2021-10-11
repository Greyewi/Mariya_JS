import {
  FETCH_TOPSALES_REQUEST,
  FETCH_TOPSALES_FAILURE,
  FETCH_TOPSALES_SUCCESS,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_FAILURE,
  FETCH_ITEM_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_MORE_REQUEST,
  FETCH_MORE_FAILURE,
  FETCH_MORE_SUCCESS,
  CHANGE_SEARCH_FIELD,
  CHANGE_FORM_FIELD,
  IS_SEARCHING,
  SET_AVALIBLE_SIZES,
  SET_QUANTITY,
  SET_SIZE,
  GET_CART_ITEMS_SUCCESS,
  SET_CART_TOTAL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/actionTypes";
import urls from "../constants";
import LOCAL_STORAGE_KEY from "../constant";

//Top-Sales
export const fetchTopSalesRequest = () => ({
  type: FETCH_TOPSALES_REQUEST,
});

export const fetchTopSalesFailure = (error) => ({
  type: FETCH_TOPSALES_FAILURE,
  payload: {
    error,
  },
});

export const fetchTopSalesSuccess = (items) => ({
  type: FETCH_TOPSALES_SUCCESS,
  payload: {
    items,
  },
});

//catalogue
export const fetchItemsRequest = (params) => ({
  type: FETCH_ITEMS_REQUEST,
  payload: params,
});

export const fetchItemsFailure = (errorItems) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: {
    errorItems,
  },
});

export const fetchItemsSuccess = (newItems) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: {
    newItems,
  },
});

//catalogue Categories
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesFailure = (errorCategories) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: {
    errorCategories,
  },
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    categories,
  },
});

//catalogue more items
export const fetchMoreRequest = (params) => ({
  type: FETCH_MORE_REQUEST,
  payload: params,
});

export const fetchMoreFailure = () => ({
  type: FETCH_MORE_FAILURE,
});

export const fetchMoreSuccess = (moreItems) => ({
  type: FETCH_MORE_SUCCESS,
  payload: {
    moreItems,
  },
});

//Search
export const changeSearchField = (searchString) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: {
    searchString,
  },
});

export const setSearching = (search) => async (dispatch) => {
  try {
    const response = await fetch(`${urls.items}?${search}`, {
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    dispatch({
      type: IS_SEARCHING,
    });
    dispatch(fetchItemsSuccess(data));
  } catch (error) {
    dispatch(fetchItemsFailure(error.message));
  }
};

//catalogue item
export const fetchItemRequest = (id) => ({
  type: FETCH_ITEM_REQUEST,
  payload: id,
});

export const fetchItemFailure = (error) => ({
  type: FETCH_ITEM_FAILURE,
  payload: {
    error,
  },
});

export const fetchItemSuccess = (item) => ({
  type: FETCH_ITEM_SUCCESS,
  payload: {
    item,
  },
});

export const setAvalibleSizes = (sizes) => ({
  type: SET_AVALIBLE_SIZES,
  payload: {
    sizes,
  },
});

export const setQuantity = (quantity) => ({
  type: SET_QUANTITY,
  payload: {
    quantity,
  },
});

export const setSize = (size) => ({
  type: SET_SIZE,
  payload: {
    size,
  },
});

//Cart
export const getCartItemsSuccess = (cartItems) => ({
  type: GET_CART_ITEMS_SUCCESS,
  payload: {
    cartItems,
  },
});

export const changeFormField = (name, value) => ({
  type: CHANGE_FORM_FIELD,
  payload: {
    name,
    value,
  },
});

export const fetchOrderRequest = () => ({
  type: FETCH_ORDER_REQUEST,
});

export const fetchOrderFailure = (error) => ({
  type: FETCH_ORDER_FAILURE,
  payload: {
    error,
  },
});

export const fetchOrderSuccess = () => ({
  type: FETCH_ORDER_SUCCESS,
});

export const setCartTotal = (total) => ({
  type: SET_CART_TOTAL,
  payload: {
    total,
  },
});

export const getCartTotal = () => (dispatch, getState) => {
  const {
    cart: { cartItems },
  } = getState();

  if (!cartItems) {
    dispatch(setCartTotal(0));
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    const itemSum = item.price * item.quantity;
    return itemSum + sum;
  }, 0);

  dispatch(setCartTotal(total));
};

export const getCartItems = () => (dispatch) => {
  const keys = Object.keys(localStorage);
  const cartItems = [];
  for (let key of keys) {
    cartItems.push(JSON.parse(localStorage.getItem(key)));
  }

  dispatch(getCartItemsSuccess(cartItems));
  // if (cartItems.length > 0) dispatch(getCartTotal())
};

export const addToCart = (id, title, size, price, amount) => ({
  type: ADD_TO_CART,
  payload: { id, title, size, price, amount },
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: { id },
});

export const clearStorage = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
};
