import reducer from "../reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import StateLoader from './state.loader';

const stateLoader = new StateLoader();
// Reference - https://stackoverflow.com/questions/37195590/how-can-i-persist-redux-state-tree-on-refresh
//export default compose(applyMiddleware(thunk))(createStore)(reducer);
let store = createStore(reducer, stateLoader.loadState(), compose(applyMiddleware(thunk)));
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});
export default store;