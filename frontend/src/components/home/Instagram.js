import React, { Component } from 'react';
import InstagramBlock from './instagram/InstagramBlock'

class Instagram extends Component{
	render (){
		return (
			<section className="instagram p-t-20">
			  <div className="sec-title p-b-52 p-l-15 p-r-15">
			    <h3 className="m-text5 t-center">
			      @ follow us on Instagram
			    </h3>
			  </div>
			  <div className="flex-w">
				  <InstagramBlock/>
				  <InstagramBlock/>
				  <InstagramBlock/>
				  <InstagramBlock/>
				  <InstagramBlock/>
			  </div>
			</section>
		);
	}
}

export default Instagram;