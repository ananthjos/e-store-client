import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetPassword, setAlert } from "../../actions/customerActions";

const ResetPassword = ({ setAlert, resetPassword, ...props }) => {
  const history = useHistory();
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setAlert("please enter your password", "info");
    } else {
      resetPassword(password, props.match.params.resetToken);
      setAlert("password changed successfully", "info");
      history.push("/customer/login");
    }
  };

  return (
    <div className='container'>
      <form className='mx-auto' style={custom}>
        <label htmlFor='password'>Reset Password</label>
        <input
          type='password'
          name='password'
          className='form-control form-control-sm'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button
          type='submit'
          className='btn btn-sm btn-outline-info mt-3'
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const custom = {
  maxWidth: "300px",
};

export default connect(null, { resetPassword, setAlert })(ResetPassword);
