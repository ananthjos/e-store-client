import { combineReducers } from "redux";
import productReducer from "./productReducer";
import customerReducer from "./customerReducer";

export default combineReducers({
  product: productReducer,
  customer: customerReducer,
});
