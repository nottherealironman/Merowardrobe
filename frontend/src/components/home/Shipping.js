import React, { Component } from 'react';

class Shipping extends Component{
	render (){
		return (
			<section className="shipping bgwhite p-t-62 p-b-46">
			  <div className="flex-w p-l-15 p-r-15">
			    <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 respon1">
			      <h4 className="m-text12 t-center">
			        Free Delivery Worldwide
			      </h4>
			      <a href="#" className="s-text11 t-center">
			        Click here for more info
			      </a>
			    </div>
			    <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 bo2 respon2">
			      <h4 className="m-text12 t-center">
			        30 Days Return
			      </h4>
			      <span className="s-text11 t-center">
			        Simply return it within 30 days for an exchange.
			      </span>
			    </div>
			    <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 respon1">
			      <h4 className="m-text12 t-center">
			        Store Opening
			      </h4>
			      <span className="s-text11 t-center">
			        Shop open from Monday to Sunday
			      </span>
			    </div>
			  </div>
			</section>

		);
	}
}

export default Shipping;