import {
  GET_PRODUCTS,
  SET_LOADING,
  GET_PRODUCT,
  FETCH_NEXT_SET_DATA,
  ADDTO_CART,
  GET_CART,
} from "../actions/types";

const initialState = {
  products: null,
  product: null,
  loading: false,
  cart: [],
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: state.products.filter((product) => product._id === payload),
      };

    case FETCH_NEXT_SET_DATA:
      return {
        ...state,
        products: [...state.products, ...payload],
      };

    case GET_CART:
      return {
        ...state,
        cart: payload,
      };
    case ADDTO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
