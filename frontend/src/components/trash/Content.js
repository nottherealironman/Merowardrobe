import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch, hashHistory} from "react-router-dom";
import Stores from '../../containers/Stores';
import Product from '../../containers/Product';
import App from '../App';

class Content extends Component{
	render(){
		return(
			<Router>
				<div class="col-md-6">
				
				</div>
			</Router>
		);
	}
}

export default Content;