import {
  CHANGE_FORM_FIELD,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  GET_CART_ITEMS_SUCCESS,
  SET_CART_TOTAL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/actionTypes";

import LOCAL_STORAGE_KEY from "../constant";

import { clearStorage } from "../actions/actionCreators";

const initialState = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : {
  cartItems: null,
  totalSum: null,
  loading: false,
  error: null,
  owner: { phone: "", address: "" },
  success: false,
};

console.log(initialState);
export default function cartReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_CART_ITEMS_SUCCESS:
      const { cartItems } = action.payload;
      return {
        ...state,
        cartItems,
        success: false,
      };
    case CHANGE_FORM_FIELD:
      const { name, value } = action.payload;
      const { owner } = state;
      return {
        ...state,
        owner: {
          ...owner,
          [name]: value,
        },
      };
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ORDER_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        error,
        loading: false,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        ...initialState,
        success: true,
      };
    case SET_CART_TOTAL:
      const { total } = action.payload;
      return {
        ...state,
        totalSum: total,
      };
    default:
      return state;
  }
}

const cartSelector = (state) => state.cart;

/*new Reducer */

// function Cart(items) {
//   this.items = items || [];
//   this.getTotal = () => {
//     return this.items.reduce(
//       (acc, { amount, price }) => acc + amount * price,
//       0
//     );
//   };
// }

// const saveToLocalStorage = (items) => {
//   window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
// };

// const loadFromLocalStorage = () => {
//   const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
//   return stored ? JSON.parse(stored) : [];
// };

// const initialState = new Cart(loadFromLocalStorage());

// export default function cartReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const { id, title, size, amount, price } = action.payload;
//       const existingItem = state.items.find(
//         ({ id: existingId, size: existingSize }) =>
//           id === existingId && size === existingSize
//       );
//       const updatedItems = !existingItem
//         ? [...state.items, { id, title, size, amount, price }]
//         : [
//             ...state.items.filter((x) => x !== existingItem),
//             {
//               id,
//               title,
//               size,
//               amount: amount + existingItem.amount,
//               price: price + existingItem.price,
//             },
//           ];
//       saveToLocalStorage(updatedItems);
//       return new Cart(updatedItems);
//     case GET_CART_ITEMS_SUCCESS:
//       const { cartItems } = action.payload;
//       return {
//         ...state,
//         cartItems,
//         success: false,
//       };
//     case CHANGE_FORM_FIELD:
//       const { name, value } = action.payload;
//       const { owner } = state;
//       return {
//         ...state,
//         owner: {
//           ...owner,
//           [name]: value,
//         },
//       };
//     case FETCH_ORDER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case FETCH_ORDER_FAILURE:
//       const { error } = action.payload;
//       return {
//         ...state,
//         error,
//         loading: false,
//       };
//     case FETCH_ORDER_SUCCESS:
//       return {
//         ...initialState,
//         success: true,
//       };
//     case SET_CART_TOTAL:
//       const { total } = action.payload;
//       return {
//         ...state,
//         totalSum: total,
//       };
//     case REMOVE_FROM_CART:
//       const { id: productForRemoving } = action.payload;
//       const items = state.items.filter(({ id }) => id !== productForRemoving);
//       saveToLocalStorage(items);
//       return new Cart(items);
//     case CLEAR_CART:
//       clearStorage();
//       return new Cart([]);
//     default:
//       return state;
//   }
// }
