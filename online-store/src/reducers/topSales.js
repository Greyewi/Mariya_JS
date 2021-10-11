import {
  FETCH_TOPSALES_REQUEST,
  FETCH_TOPSALES_FAILURE,
  FETCH_TOPSALES_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOPSALES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOPSALES_FAILURE:
      const error = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_TOPSALES_SUCCESS:
      const items = action.payload;
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
