import React, { useState } from "react";
import { connect } from "react-redux";
import { customerLogin } from "../../actions/customerActions";
import { Link, Redirect } from "react-router-dom";

const Login = ({ customerLogin, auth }) => {
  const [customerDetails, setDetails] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    customerLogin(customerDetails);
  };

  if (auth) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <Link className='btn btn-sm mb-2' to='/'>
        <i className='fas fa-arrow-circle-left fa-2x'></i>
      </Link>
      <h4 className='text-center mb-3'>Login</h4>
      <form style={custom} className='mx-auto'>
        <div className='form-group'>
          <label htmlFor='email'>Email :</label>
          <input
            type='email'
            name='email'
            value={customerDetails.email}
            onChange={(e) => onChange(e)}
            required
            className='form-control form-control-sm '
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password :</label>
          <input
            type='password'
            name='password'
            value={customerDetails.password}
            onChange={(e) => onChange(e)}
            className='form-control form-control-sm '
            required
          />
        </div>
        <button
          type='submit'
          className='btn btn-outline-primary btn-block btn-sm mt-4'
          onClick={(e) => onSubmit(e)}
        >
          Login
        </button>
      </form>
      <h6 className='text-center mt-3'>
        <Link to='/customer/register'>New User? SignUp</Link>
      </h6>
      <h6 className='text-center mt-3'>
        <Link to='/'>Forgot Password?</Link>
      </h6>
    </div>
  );
};
const custom = {
  width: "300px",
  height: "auto",
};
const mapStateToProps = (state) => ({
  auth: state.customer.isAuthenticated,
});

export default connect(mapStateToProps, { customerLogin })(Login);
