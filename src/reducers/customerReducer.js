import {
  REGISTER_CUSTOMER,
  LOGIN_CUSTOMER,
  LOAD_CUSTOMER,
  LOGOUT,
  EDIT_CUSTOMER,
  SET_ALERT,
  REMOVE_ALERT,
  ORDER_HISTORY,
} from "../actions/types";

const initailState = {
  customer: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  alert: null,
  address: null,
  orderHistory: null,
};

// eslint-disable-next-line
export default (state = initailState, action) => {
  let { type, payload } = action;
  switch (type) {
    case REGISTER_CUSTOMER:
    case LOGIN_CUSTOMER:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
      };
    case LOAD_CUSTOMER:
      return {
        ...state,
        customer: payload,
        address: payload.address ? payload.address : null,
        isAuthenticated: true,
      };
    case EDIT_CUSTOMER:
      return {
        ...state,
        customer: payload,
        isAuthenticated: true,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case ORDER_HISTORY:
      return {
        ...state,
        orderHistory: payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        customer: null,
        token: null,
      };
    default:
      return state;
  }
};
