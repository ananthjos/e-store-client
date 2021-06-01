import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/customerActions";
import "../css/Navbar.css";

const Navbar = ({ cart, auth, logout }) => {
  const onClick = () => {
    logout();
  };

  return (
    <div className='sticky-top'>
      <nav className='navbar navbar-expand-sm navbar-light bg-white'>
        <div className='container'>
          <a className='navbar-brand' href='/'>
            <h3>
              <b>e-store</b>{" "}
            </h3>
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ml-auto'>
              {!auth && (
                <li className='nav-item '>
                  <Link className='nav-link m-2' to='/customer/login'>
                    <b>Login</b>
                  </Link>
                </li>
              )}
              <li className='nav-item cart-icon'>
                <Link className='nav-link button ' to='/checkout'>
                  <i className='fa fa-shopping-cart text-dark  mycustomicon '></i>
                  <span className='badge badge-light bg-info text-white num'>
                    {cart}
                  </span>
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <button
                  href='#'
                  className='nav-link dropdown-toggle btn '
                  data-toggle='dropdown'
                  id='navbardropdwnlink'
                >
                  <i className='fas fa-user-circle  text-dark mycustomicon'></i>
                </button>
                <div className='dropdown-menu'>
                  {auth ? (
                    <Link className='dropdown-item' to='/personaldetails'>
                      Account
                    </Link>
                  ) : (
                    <Link to='/customer/login' className='dropdown-item'>
                      Account
                    </Link>
                  )}
                  {auth && (
                    <Link
                      className='dropdown-item'
                      to='/'
                      onClick={() => onClick()}
                    >
                      Logout
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.product.cart,
  auth: state.customer.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Navbar);
