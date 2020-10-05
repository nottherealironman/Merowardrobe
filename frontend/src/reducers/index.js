import { combineReducers } from "redux";
import user from "./user";
import stores from "./stores";
import product from "./product";
import data from "./data";

export default combineReducers({user, stores, product, data});