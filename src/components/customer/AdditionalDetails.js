import React, { useState } from "react";
import { connect } from "react-redux";
import { editCustomer, setAlert } from "../../actions/customerActions";
import { useHistory, Link } from "react-router-dom";

import "../css/additionaldetails.css";

const AdditionalDetails = ({ editCustomer, customer, setAlert }) => {
  const history = useHistory();
  const [phone, setPhone] = useState(customer.phone ? customer.phone : "");

  const [address, setAddress] = useState({
    state:
      customer.address && customer.address.state ? customer.address.state : "",
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

  const { name, email } = customer;
  const onChange = (e) => {
    setPhone(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!phone || !address) {
      setAlert("please eneter details", "danger");
    }
    editCustomer({ name, email, phone, address });
    setAlert("additional details added successfully", "info");
    history.push("/personaldetails");
  };

  return (
    <div>
      <h3 className='text-center'>Shipping details</h3>
      <form className='p-3' id='adddet-form'>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input
            type='text'
            className='form-control form-control-sm'
            name='phone'
            value={phone}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='state'>State</label>
          <input
            type='text'
            name='state'
            className='form-control form-control-sm'
            value={address.state}
            required
            onChange={(e) => onChangeAddress(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            className='form-control form-control-sm'
            value={address.city}
            required
            onChange={(e) => onChangeAddress(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='pincode'>Pincode</label>
          <input
            type='text'
            name='pincode'
            className='form-control form-control-sm'
            value={address.pincode}
            required
            onChange={(e) => onChangeAddress(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address1'>Address</label>
          <textarea
            type='text'
            value={address.address1}
            name='address1'
            className='form-control'
            required
            onChange={(e) => onChangeAddress(e)}
          ></textarea>
        </div>
      </form>
      <div className='button-submit'>
        <button
          type='submit'
          className='btn btn-sm btn-outline-dark mr-2'
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
        <Link
          to='/editcustomer-details'
          className='btn btn-sm btn-outline-dark'
        >
          Edit Details
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customer: state.customer.customer,
});

export default connect(mapStateToProps, { editCustomer, setAlert })(
  AdditionalDetails
);
