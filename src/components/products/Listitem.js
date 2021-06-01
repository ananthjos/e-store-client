import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addtoCart,
  onDecrement,
  onIncrement,
  getProduct,
} from "../../actions/productActions";
import { setAlert } from "../../actions/customerActions";
import "../css/Listitem.css";

import { Link } from "react-router-dom";

const Listitem = ({ product, onDecrement, onIncrement, setAlert, cart }) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const updateQuantity = () => {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let item;
    if (cartItems && cartItems.length > 0) {
      item = cartItems.filter((prod) => prod._id === product._id);
      setItemQuantity(item.length > 0 && item[0].quantity);
    } else {
      setItemQuantity(0);
    }
  };
  useEffect(() => {
    updateQuantity();
    // eslint-disable-next-line
  }, []);

  return (
    <li id='product-list' className='p-2 border text-center'>
      <img src={product.image} alt='' id='product-img' />
      <h6 className='mt-3'>
        {" "}
        <b> {product.title}</b>
      </h6>
      <h6 className='mt-3'> ₹{product.price}</h6>
      <div>
        <i className='fas fa-shopping-cart text-primary'></i>
      </div>
      <button
        id='counter-btn'
        className='btn'
        onClick={() => {
          onDecrement(product._id);
          updateQuantity();
        }}
      >
        -
      </button>
      {itemQuantity > 0 ? itemQuantity : 0}
      <button
        id='counter-btn'
        className='btn '
        onClick={() => {
          onIncrement(product);
          updateQuantity();
        }}
      >
        +
      </button>
      <div>
        <Link
          to={`/product-details/${product._id}`}
          className='btn btn-outline-dark btn-sm btn-rounded'
        >
          view more
        </Link>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => ({
  cart: state.product.cart,
});

export default connect(mapStateToProps, {
  addtoCart,
  onDecrement,
  onIncrement,
  getProduct,
  setAlert,
})(Listitem);
