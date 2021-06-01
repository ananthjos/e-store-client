import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/products/Home";
import Checkout from "./components/products/Checkout";
import Register from "./components/customer/Register";
import Login from "./components/customer/Login";
import setAuthToken from "./authentication/setAuthToken";
import "./App.css";
import { loadCustomer } from "./actions/customerActions";
import Account from "./components/customer/Account";
import { getCart } from "./actions/productActions";
import ProductDetails from "./components/products/ProductDetails";
import PrivateRoute from "./authentication/PrivateRoute";
import NotFound from "./components/layout/Notfound";
import MiniNav from "./components/layout/MiniNavbar";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.dispatch(loadCustomer());
    }
    if (localStorage.getItem("cart")) {
      store.dispatch(getCart());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <MiniNav />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/checkout' component={Checkout}></Route>
          <Route exact path='/customer/register' component={Register}></Route>
          <Route exact path='/customer/login' component={Login}></Route>
          <PrivateRoute
            exact
            path='/personaldetails'
            component={Account}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path='/pastorders'
            component={Account}
          ></PrivateRoute>
          <Route
            exact
            path='/product-details/:id'
            component={ProductDetails}
          ></Route>
          <PrivateRoute
            exact
            path='/additional-details'
            component={Account}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path='/forgotpassword'
            component={Account}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path='/editcustomer-details'
            component={Account}
          ></PrivateRoute>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
