import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import Home from './home';
import Login from './Login';
import Signup from './Signup';
import Account from '../containers/Account';
import Dashboard from '../containers/Dashboard';
import Stores from '../containers/Stores';
import Product from '../containers/Product';
import Logout from '../containers/Logout';
import RequireAdmin from '../containers/RequireAdmin';
import store from '../store';
import { connect } from "react-redux";

class Content extends Component{
	render (){
        
		return (
			<div>
				<Switch>
		            <Route path='/frontend' component={Home}/>
		            <Route path='/login' component={Account}/>
		            <Route path='/signup' component={Signup}/>
		            <Route path='/dashboard' component={Dashboard}/>
		            <Route path='/store' component={Stores}/>
		            <Route path='/product' component={Product}/>
		            <Route path='/logout' component={Logout}/>
		        </Switch>
			</div>
		);
	}
}

/*const mapStateToProps = (state)=> {
  return { user : state.user };
}

export default connect(mapStateToProps)(Content);*/
export default Content;