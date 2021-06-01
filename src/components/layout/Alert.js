import React from "react";
import { connect } from "react-redux";

const Alert = ({ alert }) => {
  if (alert != null) {
    return (
      <div
        className={`alert alert-${alert.className} alert-dismissible fade show mx-auto`}
        role='alert'
        style={{ maxWidth: "500px" }}
      >
        <i className='fa fa-info-circle'></i> {""}
        {alert.msg}
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state) => ({
  alert: state.customer.alert,
});

export default connect(mapStateToProps)(Alert);
