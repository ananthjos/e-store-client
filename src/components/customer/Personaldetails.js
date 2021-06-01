import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { deleteCustomer, setAlert } from "../../actions/customerActions";
import "../css/personaldetails.css";
const Personaldetails = ({ customer, deleteCustomer, setAlert }) => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    history.push("/editcustomer-details");
  };

  const onDelete = () => {
    deleteCustomer();
    setAlert("account deleted successfully", "info");
    history.push("/");
  };

  return (
    <div className='p-3' id='personDet'>
      <h5 className='text-center'>Personal Details</h5>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>
            <b>Name :</b>{" "}
          </label>
          <input
            type='text'
            name='name'
            value={customer.name}
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
            value={customer.email}
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
            value={customer.phone ? customer.phone : ""}
            onChange={(e) => onChange(e)}
            className='form-control form-control-sm'
          />
        </div>
      </form>
      <div className='button-display'>
        <button
          type='submit'
          className='btn btn-outline-dark btn-sm mr-3'
          onClick={() => onSubmit()}
        >
          Edit Details
        </button>
        <button
          type='button'
          className='btn btn-danger btn-sm'
          data-toggle='modal'
          data-target='#exampleModal'
        >
          DeleteAccount
        </button>
      </div>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              Are you sure ? you want to delete your account permanently
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-dark btn-sm'
                data-dismiss='modal'
              >
                Close
              </button>
              <button
                type='submit'
                className='btn btn-danger btn-sm'
                data-dismiss='modal'
                onClick={() => onDelete()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customer: state.customer.customer,
});

export default connect(mapStateToProps, { deleteCustomer, setAlert })(
  Personaldetails
);
