import React, { Component } from 'react';
import Slider from './Slider';
import Banner from './Banner';
import NewProduct from './NewProduct';
import Blog from './Blog';
import Instagram from './Instagram';
import Shipping from './Shipping';

class Home extends Component{
	render (){
		return (
			<div>
				<Slider/>
				<Banner/>
				<NewProduct/>
				<Instagram/>
				<Shipping/>
			</div>
		);
	}
}

export default Home;