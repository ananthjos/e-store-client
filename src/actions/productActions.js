import {
  GET_PRODUCTS,
  SET_LOADING,
  GET_PRODUCT,
  FETCH_NEXT_SET_DATA,
  ADDTO_CART,
  GET_CART,
} from "./types";
import axios from "axios";

const url = "https://secret-tundra-63340.herokuapp.com";

// get all products from db
export const getProducts = () => async (dispatch) => {
  try {
    setLoading();
    let products = await axios.get(`${url}/api/product/all`);
    let res = await products.data.products;
    dispatch({ type: GET_PRODUCTS, payload: res });
  } catch (error) {
    console.log(error.message);
  }
};
// fetch next data from db
export const fetchNextSetOfData = (limit, skip) => async (dispatch) => {
  try {
    setLoading();
    let products = await axios.get(
      `${url}/api/product/all?limit=${limit}&skip=${skip}`
    );
    let res = await products.data.products;
    dispatch({ type: FETCH_NEXT_SET_DATA, payload: res });
  } catch (error) {
    console.log(error.message);
  }
};

// get single product from state products
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

// add product to state cart
export const addtoCart = (product) => async (dispatch) => {
  dispatch({ type: ADDTO_CART, payload: product });
};

// get products from state cart
export const getCart = () => async (dispatch) => {
  if (localStorage.getItem("cart")) {
    const items = JSON.parse(localStorage.getItem("cart"));
    let totalQuantity;
    if (items) {
      totalQuantity = items.reduce((sum, cur) => sum + cur.quantity, 0);
    }
    dispatch({ type: GET_CART, payload: totalQuantity });
  }
};

// loading
export const setLoading = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
};

// quantity decrement
export const onDecrement = (id) => (dispatch) => {
  let items = JSON.parse(localStorage.getItem("cart"));
  if (items.length > 0) {
    items.forEach((item) => {
      if (item._id === id && item.quantity > 0) {
        item.quantity--;
      }
    });

    localStorage.setItem("cart", JSON.stringify(items));
    dispatch(getCart());
  }
};

// quantity Increment
export const onIncrement = (product) => (dispatch) => {
  let items;
  if (localStorage.getItem("cart") === null) {
    items = [];
    product.quantity = 1;
    items.push(product);
    localStorage.setItem("cart", JSON.stringify(items));
  } else {
    let lsItems = JSON.parse(localStorage.getItem("cart"));

    let isExist = lsItems.filter((item) => item._id === product._id);

    if (isExist.length > 0) {
      lsItems.forEach((item) => {
        if (item._id === product._id && item.quantity < 2) {
          item.quantity++;
        }
      });
    } else {
      product.quantity = 1;
      lsItems.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(lsItems));
  }
  dispatch(getCart());
};
