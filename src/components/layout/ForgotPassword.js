import React, { useState } from "react";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom'
import { forgotPassword, setAlert } from "../../actions/customerActions";
import "../css/forgotpassword.css";

const ForgotPassword = ({ forgotPassword ,setAlert}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return setAlert("please enter your email", "info");
    }else {
      forgotPassword(email);
      history.push('/')
    }
  };
  return (
    <div className='container'>
      <h5 className='text-center mb-3'>Forgot password</h5>

      <form className='forgot-form mx-auto'>
        <div className='form-group  '>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            className='form-control form-control-sm'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button
          type='submit'
          className='btn btn-outline-info btn-sm'
          onClick={(e) => onSubmit(e)}
        >
          submit
        </button>
      </form>
      <p className='text-center mt-3 text-info'>
        Note :a password reset link will be sent to your registered email
        address
      </p>
    </div>
  );
};

export default connect(null, { forgotPassword, setAlert })(ForgotPassword);
