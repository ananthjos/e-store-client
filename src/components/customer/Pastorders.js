import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getorderHistory } from "../../actions/customerActions";
import "../css/pastorders.css";

const Pastorders = ({ ordHistory, getorderHistory }) => {
  useEffect(() => {
    getorderHistory();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h4 className='text-center'>Orders History</h4>
      <table className='table table-striped desktop-pastorders'>
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
          {ordHistory &&
            ordHistory.length > 0 &&
            ordHistory.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.image} id='item-img' alt='' />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* responsive pastorders table */}
      <table className='table table-striped desktop-pastorders mini-pastorders'>
        <thead>
          <tr>
            {/* <th>#</th> */}

            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {ordHistory &&
            ordHistory.length > 0 &&
            ordHistory.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <b>{index + 1}</b>. {""}
                    {item.title.slice(0, 9)}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ordHistory: state.customer.orderHistory,
});
export default connect(mapStateToProps, { getorderHistory })(Pastorders);
