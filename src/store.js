import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Rootreducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  Rootreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
