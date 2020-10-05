import React, { Component } from 'react';
import { connect } from "react-redux";

const DisplayStore = ({storesInfo}) =>{

	return (
			<div>
				<label>STORE INFO</label>
				  <div className="card">
				    <ul className="list-group list-group-flush">
				      <li className="list-group-item" style={{paddingLeft: 30}}>
				        <div className="row">
				          <div className="col-md-4">
				            <div className="mb-10">
				              {storesInfo.name}
				            </div>
				            <div className="mb-10">
				              Pan No. {storesInfo.pan} 
				            </div>
				            <div className="mb-10">
				              <i className="fa fa-phone" />
				              <a href="tel:{storesInfo.phone}">
				              	{storesInfo.phone} 
				              </a>
				              <i className="fa fa-check-circle" style={{color: 'green'}} />
				            </div>
				            <div className="mb-10">
				              <i className="fa fa-map-marker" />
				              {storesInfo.location}
				            </div>
				            <div className="mb-10">
				              {storesInfo.description}
				            </div>
				          </div>
				        </div>
				      </li>
				    </ul>
				  </div>
			</div>);
}

export default DisplayStore;