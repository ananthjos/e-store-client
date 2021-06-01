import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getorderHistory } from "../../actions/customerActions";

const Pastorders = ({ ordHistory, getorderHistory }) => {
  useEffect(() => {
    getorderHistory();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h4 className='text-center'>Orders History</h4>
      <table className='table table-striped'>
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
                <tr key={Math.random() * 1000}>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  ordHistory: state.customer.orderHistory,
});
export default connect(mapStateToProps, { getorderHistory })(Pastorders);
