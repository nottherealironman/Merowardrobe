import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, withRouter, Route, Switch, Link } from "react-router-dom";
import { fetchProduct } from "../../actions/productActions";
import store from '../../store';

class DisplayProduct extends Component{
	constructor(props){
		super(props);
		this.renderProduct = this.renderProduct.bind(this);
		this.editProduct = this.editProduct.bind(this);
	}

	editProduct(id){
	    store.dispatch(fetchProduct(id));
	    this.props.history.push("/product/edit-product");
	}

	
	renderProduct(products){
		var count;
		let rows = Object.keys(products).map((key,value)=>{
				count = key;
				return (
						<tr key={key}>
				          <th scope="row">{++count}.</th>
				          <td>{products[key].title}</td>
				          <td>{products[key].category_name}</td>
				          <td>{products[key].brand_name}</td>
				          
				          <td>
				            <button onClick={()=>this.editProduct(products[key].id)} className="btn btn-info">
				              <i className="fa fa-pencil"/>
				            </button>
				            
				            <button type="button" className="btn btn-danger js-remove_product" data-product_id="{{ product.id }}" data-token="{{ csrf_token }}">
				              <i className="fa fa-trash" />
				            </button>
				          </td>
				        </tr>
				);
		});
		return rows;
	}

    render(){
        return (
			<div className="col-md-7">
				<Link className="btn btn-success" to="/product/create-product">Add Product</Link>
				<table className="table table-striped">
			      <thead>
			        <tr>
			          <th scope="col">#</th>
			          <th scope="col">Product title</th>
			          <th scope="col">Category</th>
			          <th scope="col">Brand</th>
			          <th scope="col">Action</th>
			        </tr>
			      </thead>
			      <tbody>
				      { this.props.productInfo.length ? this.renderProduct(this.props.productInfo) : 'No products found!' }
			        </tbody>
			    </table>
			</div>
		);
    }

}

export default withRouter(DisplayProduct);