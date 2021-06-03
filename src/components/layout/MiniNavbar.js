import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/customerActions";
import "../css/mininav.css";

const MiniNavbar = ({ auth, logout, cart }) => {
  return (
    <div className='mininav'>
      <nav>
        <div className='text-center bg-light p-2'>
          <Link to='/personaldetails'>
            <i className='fas fa-user fa-2x text-dark'></i>
          </Link>

          <Link to='/checkout'>
            <span className='badge badge-success'>{cart}</span>
            <i className='fas fa-shopping-cart fa-2x text-dark '></i>
          </Link>
          {auth && (
            <i
              className='fas fa-sign-out-alt fa-2x'
              onClick={() => logout()}
            ></i>
          )}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.customer.isAuthenticated,
  cart: state.product.cart,
});

export default connect(mapStateToProps, { logout })(MiniNavbar);
