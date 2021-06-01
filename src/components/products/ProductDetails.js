import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getProduct,
  onIncrement,
  onDecrement,
  getProducts,
} from "../../actions/productActions";
import { setAlert } from "../../actions/customerActions";
import "../css/productdetails.css";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";

const ProductDetails = ({
  getProduct,
  product,
  onDecrement,
  onIncrement,
  getProducts,
  loading,
  products,
  setAlert,
  cart,
  ...props
}) => {
  let [itemQuantity, setItemQuantity] = useState(0);

  const updateQuantity = () => {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let item;
    if (cartItems && cartItems.length > 0) {
      item = cartItems.filter(
        (prod) => product && product.length && prod._id === product[0]._id
      );

      setItemQuantity(item.length > 0 && item[0].quantity);
    }
  };

  useEffect(() => {
    getProducts();
    updateQuantity();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateQuantity();
    // eslint-disable-next-line
  }, [itemQuantity]);

  useEffect(() => {
    if (products && products.length) {
      getProduct(props.match.params.id);
    }
    // eslint-disable-next-line
  }, [products]);

  if (loading || !product) {
    return <Loader />;
  }

  return (
    <>
      <Link className='btn btn-sm mb-2' to='/'>
        <i className='fas fa-arrow-circle-left fa-2x'></i>
      </Link>
      <div className='d-flex justify-content-around mt-5'>
        {product && product.length > 0 ? (
          <>
            <div>
              <img src={product[0].image} alt='' id='img2' />
              <img
                src='https://images-na.ssl-images-amazon.com/images/I/81B3-wJLEgL._SL1500_.jpg'
                alt=''
                id='img2'
              />
            </div>
            <div id='desc-para'>
              <h5 className='mb-3'>{product[0].title}</h5>
              <h5 className='mb-3'>
                Price : ₹<span className='text-danger'>{product[0].price}</span>
              </h5>
              <div className='mb-3'>
                <i className='fas fa-shopping-cart text-primary'></i>
                <button
                  className='btn btn-sm '
                  id='counter-btn'
                  onClick={() => {
                    onDecrement(product[0]._id);
                    updateQuantity();
                  }}
                >
                  -
                </button>

                {itemQuantity}
                <button
                  id='counter-btn'
                  className='btn btn-sm '
                  onClick={() => {
                    onIncrement(product[0]);
                    updateQuantity();
                  }}
                >
                  +
                </button>
              </div>
              <p className='mb-5'>{product[0].description}</p>
            </div>
          </>
        ) : (
          <p>No details</p>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  product: state.product.product,
  loading: state.customer.loading,
  products: state.product.products,
  cart: state.product.cart,
});

export default connect(mapStateToProps, {
  getProduct,
  onDecrement,
  onIncrement,
  getProducts,
  setAlert,
})(ProductDetails);
