import React from "react";
import { Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";

const Privateroute = ({ auth, component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? (
          history.push("/customer/login")
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};
const mapStateToProps = (state) => ({
  auth: state.customer.isAuthenticated,
});

export default connect(mapStateToProps)(Privateroute);
