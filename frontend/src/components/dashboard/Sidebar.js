import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component{
	render(){
		return(
				<div className="col-md-3 p-b-30">
				  <div className="p-r-20 p-r-0-lg">
				    <div className="custom__sidebar">
				      <label>MY ACCOUNT</label>
				      <ul>
				        <li>
				          <Link to="/dashboard" className="sidebar__title">
				            PERSONAL INFORMATION
				          </Link>
				        </li>
				        {/* For Retailer */}
				        <li>
				          <Link to="/store" className="sidebar__title">
				            STORE INFORMATION
				          </Link>
				        </li>
				        <li>
				          <Link to="/product" className="sidebar__title">
				            MY PRODUCTS
				          </Link>
				        </li>
				        {/* For seller END */}
				        {/* For Customer */}
				        <li>
				          <Link to="/logout">Logout</Link>
				        </li>
				        {/* For customer END */}
				      </ul>
				    </div>
				  </div>
				</div>
		);
	}
}

export default Sidebar;