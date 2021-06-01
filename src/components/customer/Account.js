import React from "react";
import Loader from "../../components/layout/Loader";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Personal from "./Personaldetails";
import PastOrders from "./Pastorders";
import AdditionalDetails from "../customer/AdditionalDetails";
import { useHistory } from "react-router-dom";
import "../css/account.css";
import EditCustomer from "./EditCustomer";

const Account = ({ customer, auth }) => {
  const history = useHistory();

  if (!customer) {
    return <Loader />;
  }

  if (auth) {
    return (
      <Router>
        <div className='mt-5' id='main'>
          <div id='sidebar-menu' className='bg-successs'>
            <li>
              <i className='fas fa-user fa-5x  bg-light '></i>
            </li>
            <li>
              {" "}
              <Link to='/personaldetails'>
                {" "}
                <i className='fas fa-user mr-2'></i>{" "}
                <span className='text-black'>Personal Details</span>
              </Link>
            </li>
            <li>
              <Link to='/pastorders'>
                <i className='fas fa-cart-plus mr-2'></i>{" "}
                <span className='text-black'>Orders History</span>
              </Link>
            </li>
            <li>
              <Link to='/additional-details'>
                <i className='fas fa-info-circle mr-2'></i>{" "}
                <span className='text-black'>Shipping Details</span>
              </Link>
            </li>
            <li>
              <Link to='/editcustomer-details'>
                <i className='fas fa-user mr-2'></i>
                <span className='text-black'> Edit Customer Details</span>
              </Link>
            </li>
          </div>
          <div id='components'>
            <Switch>
              <Route exact path='/personaldetails' component={Personal}></Route>
              <Route exact path='/pastorders' component={PastOrders}></Route>
              <Route
                exact
                path='/additional-details'
                component={AdditionalDetails}
              ></Route>
              <Route
                exact
                path='/editcustomer-details'
                component={EditCustomer}
              ></Route>
            </Switch>
          </div>
          <a href='#main'>
            <i className='fas fa-arrow-up  up-arrow'></i>
          </a>
        </div>
      </Router>
    );
  } else {
    history.push("/customer/login");
  }
};
const mapStateToProps = (state) => ({
  customer: state.customer.customer,
  auth: state.customer.isAuthenticated,
});

export default connect(mapStateToProps)(Account);
