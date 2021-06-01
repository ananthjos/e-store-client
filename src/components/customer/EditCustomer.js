import React, { useState } from "react";
import { connect } from "react-redux";
import { editCustomer, setAlert } from "../../actions/customerActions";
import { useHistory } from "react-router-dom";
import "../css/personaldetails.css";

const EditCustomer = ({ editCustomer, setAlert, customer }) => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    name: customer.name ? customer.name : "",
    email: customer.email ? customer.email : "",
    phone: customer.phone ? customer.phone : "",
    password: "",
  });

  const [address, setAddress] = useState({
    state:
      customer.address && customer.address.state ? customer.address.state : " ",
    city:
      customer.address && customer.address.city ? customer.address.city : "",
    pincode:
      customer.address && customer.address.pincode
        ? customer.address.pincode
        : "",
    address1:
      customer.address && customer.address.address1
        ? customer.address.address1
        : "",
  });

  const onChangeAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (!userDetails || !address) {
      setAlert("please fill in details", "danger");
    }
    const { name, email, phone, password } = userDetails;
    editCustomer({ name, email, phone, address, password });
    setAlert("details updated successfuly", "info");
    history.push("/personaldetails");
  };

  return (
    <div className='p-3' id='personDet'>
      <h5 className='text-center'>Edit Details</h5>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>
            <b>Name :</b>{" "}
          </label>
          <input
            type='text'
            name='name'
            value={userDetails.name}
            onChange={(e) => onChange(e)}
            className='form-control form-control-sm'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>
            <b>Email :</b>{" "}
          </label>
          <input
            type='email'
            name='email'
            value={userDetails.email}
            onChange={(e) => onChange(e)}
            className='form-control form-control-sm'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>
            <b>Phone :</b>{" "}
          </label>
          <input
            type='text'
            name='phone'
            value={userDetails.phone}
            onChange={(e) => onChange(e)}
            className='form-control form-control-sm'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>
            <b>Password:</b>{" "}
          </label>
          <input
            type='password'
            name='password'
            value={userDetails.password}
            onChange={(e) => onChange(e)}
            className='form-control form-control-sm'
            maxLength={8}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='state'>
            <b>State :</b>{" "}
          </label>
          <input
            type='text'
            name='state'
            value={address.state}
            onChange={(e) => onChangeAddress(e)}
            className='form-control form-control-sm'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>
            <b>City :</b>{" "}
          </label>
          <input
            type='text'
            name='city'
            value={address.city}
            onChange={(e) => onChangeAddress(e)}
            className='form-control form-control-sm'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='pincode'>
            <b>Pincode :</b>{" "}
          </label>
          <input
            type='text'
            name='pincode'
            value={address.pincode}
            onChange={(e) => onChangeAddress(e)}
            className='form-control form-control-sm'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address1'>
            <b>Address :</b>{" "}
          </label>
          <textarea
            name='address1'
            className='form-control'
            onChange={(e) => onChangeAddress(e)}
            value={address.address1}
          ></textarea>
        </div>
      </form>
      <div className='d-flex justify-content-end'>
        <button
          type='submit'
          className='btn btn-outline-dark btn-sm mr-3'
          onClick={() => onSubmit()}
        >
          Save Details
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  customer: state.customer.customer,
});

export default connect(mapStateToProps, { editCustomer, setAlert })(
  EditCustomer
);
