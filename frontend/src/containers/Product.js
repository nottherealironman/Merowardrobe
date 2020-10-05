import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Create from "../components/products/Create";
import Edit from "../components/products/Edit";
import DisplayProduct from "../components/products/DisplayProduct";
import axios from 'axios'; 
import { fetchAllProducts, fetchData } from "../actions/productActions";
import Sidebar from "../components/dashboard/Sidebar";
import Stores from "./Stores";
import store from '../store';

class Product extends Component{
	componentDidMount(){
		//store.dispatch(fetchAllProducts());
		//store.dispatch(fetchData());

		this.props.onfetchAllProducts(this.props.user.userinfo.id);
		this.props.onfetchData();
	}

	render(){
		//const { product, data } = store.getState();

		let product = this.props.product;
		let data = this.props.data;

		let allInfo = data;
		allInfo = Object.assign(allInfo, {'product':product.product});
		const productInfo = product.all_products;
		const categories = data.categories;

		return (
				<section className="bgwhite p-t-66 p-b-60">
			        <div className="container">
			            <div className="row">
			            	<Sidebar/>
			            	<Switch>
							    <Route exact path='/product' render={()=><DisplayProduct productInfo={ productInfo }/>}/>
							    <Route path='/product/create-product' render={()=><Create data={ data }/>}/>
							    <Route path='/product/edit-product' render={()=><Edit data={ allInfo }/>}/>
						    </Switch>
			            </div>
			        </div>
		        </section>);
	}
}

const mapStateToProps = (state)=> {
  return {
    product : state.product,
    data : state.data,
    user : state.user
  };
}

/*const mapDispatchToProps = (dispatch) => {
  return {
    onfetchData: function() {
      dispatch(fetchData());
    }
  }
};*/

const mapDispatchToProps = (dispatch) => ({
    onfetchAllProducts : (id) =>dispatch(fetchAllProducts(id)),
    onfetchData : () =>dispatch(fetchData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);