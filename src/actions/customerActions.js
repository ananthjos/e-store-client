import {
  REGISTER_CUSTOMER,
  LOGIN_CUSTOMER,
  LOAD_CUSTOMER,
  LOGOUT,
  EDIT_CUSTOMER,
  SET_ALERT,
  REMOVE_ALERT,
  ORDER_HISTORY,
} from "./types";
import axios from "axios";
import setAuthToken from "../authentication/setAuthToken";

const url = "https://secret-tundra-63340.herokuapp.com";

// loadCustomer
export const loadCustomer = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let customer = await axios.get(`${url}/api/customer`);
    let res = await customer.data.customer;
    dispatch({ type: LOAD_CUSTOMER, payload: res });
    // dispatch({ type: CUSTOMER_ADDRESS, payload: res.address });
  } catch (error) {
    console.log(error.message);
  }
};

// register customer
export const customerRegister = (customer) => async (dispatch) => {
  let { name, email, password } = customer;
  try {
    let customer = await axios.post(
      `${url}/api/customer/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let res = await customer.data.token;
    dispatch({ type: REGISTER_CUSTOMER, payload: res });
    dispatch(setAlert("registered successfully", "success"));
    dispatch(loadCustomer());
  } catch (error) {
    dispatch(setAlert("invalid credentials", "danger"));
  }
};

// register Login
export const customerLogin = (customer) => async (dispatch) => {
  let { email, password } = customer;
  try {
    let customer = await axios.post(
      `${url}/api/customer/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let res = await customer.data.token;

    dispatch({ type: LOGIN_CUSTOMER, payload: res });
    dispatch(setAlert("Logged in successfully", "info"));
    dispatch(loadCustomer());
  } catch (error) {
    console.log(error.message);
    dispatch(setAlert("invalid credentials", "danger"));
  }
};

// edit customer details
export const editCustomer = (customer) => async (dispatch) => {
  const { name, email, phone, address, password } = customer;
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let customer = await axios.put(`${url}/api/customer/update`, {
      name,
      email,
      phone,
      address,
      password,
    });
    let res = await customer.data.updCustomer;

    dispatch({ type: EDIT_CUSTOMER, payload: res });
    dispatch(loadCustomer());
  } catch (error) {
    console.log(error.message);
  }
};

// delete account
export const deleteCustomer = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    await axios.delete(`${url}/api/customer/delete`);

    dispatch(logout());
  } catch (error) {
    console.log(error);
  }
};

// alert
export const setAlert = (msg, className) => (dispatch) => {
  // remove remaining alerts
  dispatch(clearAlert());

  dispatch({ type: SET_ALERT, payload: { msg, className } });

  setTimeout(() => {
    dispatch(clearAlert());
  }, 3000);
};

export const clearAlert = () => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: null });
};
// customer Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert("logged out successfully", "info"));
};

// save customer past orders to db
export const savePastorders = (pastorders) => async () => {
  pastorders.forEach((item) => {
    item.date = new Date();
  });

  try {
    await axios.post(`${url}/api/customer/pastorders`, {
      product: pastorders,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// get customer past orders from db
export const getorderHistory = () => async (dispatch) => {
  try {
    let orderHistory = await axios.get(`${url}/api/customer/orders-history`);
    let res = await orderHistory.data;

    dispatch({ type: ORDER_HISTORY, payload: res });
  } catch (error) {
    console.log(error.message);
  }
};

// forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    let customer = await axios.post(`${url}/api/customer/forgot`, {
      email,
    });
    let res = await customer.data;
  } catch (error) {
    console.log(error.message);
  }
};

// resetpassword
export const resetPassword = (password,resetToken) => async (dispatch) => {
  try {
    let customer = await axios.put(
      `${url}/api/customer/resetPassword/${resetToken}`,
      {
        password,
      }
    );
    let res = await customer.data;
  } catch (error) {
    console.log(error.message);
  }
};
