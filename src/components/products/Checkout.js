import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getCart,
  onIncrement,
  onDecrement,
} from "../../actions/productActions";
import { setAlert, savePastorders } from "../../actions/customerActions";
import "../css/checkout.css";
import { Link, useHistory } from "react-router-dom";

const Checkout = ({
  getCart,
  onDecrement,
  onIncrement,
  customer,
  auth,
  setAlert,
  address,
  savePastorders,
}) => {
  let history = useHistory();

  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  let [items, setItems] = useState([]);

  let cartItems = JSON.parse(localStorage.getItem("cart"));
  if (cartItems) {
    cartItems = cartItems.filter((cartitem) => cartitem.quantity > 0);
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  const getQuantity = () => {
    if (cartItems && cartItems.length) {
      cartItems.forEach((item) => {
        item.price = item.price * item.quantity;
      });
      setQuantity(cartItems.reduce((sum, curObj) => sum + curObj.quantity, 0));
      setTotal(cartItems.reduce((sum, cur) => sum + cur.price, 0));
      setItems(cartItems);
    }
  };

  const updateQuantity = (id) => {
    let lsPrdoucts = JSON.parse(localStorage.getItem("cart"));
    if (lsPrdoucts && lsPrdoucts.length > 0) {
      let item = lsPrdoucts.filter((product) => product._id === id);
      let newItems = items.filter((pro) => pro.quantity > 0);
      let copyData = [...newItems];
      copyData.forEach((product) => {
        if (product._id === item[0]._id) {
          product.quantity = item[0].quantity;
          product.price = product.quantity * item[0].price;
        }
      });
      setQuantity(copyData.reduce((sum, curObj) => sum + curObj.quantity, 0));
      setTotal(copyData.reduce((sum, cur) => sum + cur.price, 0));
      copyData = copyData.filter((cartitem) => cartitem.quantity > 0);
      setItems(copyData);
    }
  };

  useEffect(() => {
    getCart();
    getQuantity();

    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [items]);

  const onOrder = () => {
    if (
      !address.state ||
      !address.pincode ||
      !address.city ||
      !address.address1
    ) {
      setAlert("please fill in additional details", "info");
      history.push("/additional-details");
    } else {
      setAlert("order placed successfully", "info");
      history.push("/");
      let pastorders = JSON.parse(localStorage.getItem("cart"));
      savePastorders(pastorders);
      localStorage.setItem("cart", JSON.stringify([]));
    }
  };

  if (!localStorage.getItem("cart")) {
    return <h4 className='text-center'>Add items to cart</h4>;
  }

  return (
    <div className='container'>
      <Link className='btn btn-sm mb-2' to='/'>
        <i className='fas fa-arrow-circle-left fa-2x'></i>
      </Link>
      <table className='table table-striped desktop-table'>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.length > 0 &&
            items.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.image} id='item-img' alt='' />
                  </td>
                  <td>
                    <Link to={`/product-details/${item._id}`}>
                      {item.title}
                    </Link>{" "}
                  </td>
                  <td>
                    <button
                      className='btn btn-lg'
                      onClick={() => {
                        onDecrement(item._id);
                        updateQuantity(item._id);
                      }}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className='btn btn-lg'
                      onClick={() => {
                        onIncrement(item);
                        updateQuantity(item._id);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          <tr className='bg-secondary  text-white'>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{quantity}</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
      {/* responsive checkout */}
      <table className='table table-striped mini-table'>
        <thead>
          <tr>
            <th>#</th>

            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.length > 0 &&
            items.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>
                    <Link to={`/product-details/${item._id}`}>
                      {item.title.slice(0,9)}
                    </Link>{" "}
                  </td>
                  <td>
                    <button
                      className='btn btn-lg'
                      onClick={() => {
                        onDecrement(item._id);
                        updateQuantity(item._id);
                      }}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className='btn btn-lg'
                      onClick={() => {
                        onIncrement(item);
                        updateQuantity(item._id);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          <tr className='bg-secondary  text-white'>
            <td>Total</td>
            <td></td>
            <td>{quantity}</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
      {/*  */}
      <div className='mx-auto'>
        {auth && items.length > 0 && (
          <button
            className='btn  btn-outline-warning btn-block mb-2 '
            onClick={() => {
              onOrder();
            }}
          >
            Order
          </button>
        )}

        {!auth && (
          <h6 className='text-center text-danger  mb-2'>
            <Link to='/customer/login' className=' m-1'>
              Please login to checkout
            </Link>
          </h6>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.customer.isAuthenticated,
  customer: state.customer.customer,
  address: state.customer.address,
});

export default connect(mapStateToProps, {
  getCart,
  onIncrement,
  onDecrement,
  setAlert,
  savePastorders,
})(Checkout);
