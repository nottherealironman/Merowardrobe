import React, { Component } from 'react';
import { connect } from "react-redux";
import {Route, Switch} from "react-router-dom";
import Create from "../components/stores/Create";
import DisplayStore from "../components/stores/DisplayStore";
import axios from 'axios'; 
import { fetchStore } from "../actions/storeActions";
import Sidebar from "../components/dashboard/Sidebar";
import store from '../store'

class Store extends Component{
	componentDidMount(){
		store.dispatch(fetchStore(this.props.user.userinfo.id));
	}

	render(){
		const { stores } = store.getState();
		const storesInfo = stores.items;

		var component = <Create />;
		if(storesInfo != null && Object.keys(storesInfo).length){
			component = <DisplayStore storesInfo={ storesInfo }/>;
		}
		
		return (
			<section className="bgwhite p-t-66 p-b-60">
		        <div className="container">
		            <div className="row">
		            	<Sidebar/>
		            	<div className="col-md-9">
		            	{component}
		            	</div>
		            </div>
		        </div>
	        </section>);
	}
}

const mapStateToProps = (state) => {
	return {
		product : state.product,
		data : state.data,
		user : state.user
  };
}

export default connect(mapStateToProps)(Store);