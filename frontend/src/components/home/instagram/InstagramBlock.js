import React, { Component } from 'react';

class InstagramBlock extends Component{
	render (){
		return (
			<div className="block4 wrap-pic-w">
			      <img src={"/static/images/gallery-03.jpg"} alt="IMG-INSTAGRAM" />
			      <a href="#" className="block4-overlay sizefull ab-t-l trans-0-4">
			        <span className="block4-overlay-heart s-text9 flex-m trans-0-4 p-l-40 p-t-25">
			          <i className="icon_heart_alt fs-20 p-r-12" aria-hidden="true" />
			          <span className="p-t-2">39</span>
			        </span>
			        <div className="block4-overlay-txt trans-0-4 p-l-40 p-r-25 p-b-30">
			          <p className="s-text10 m-b-15 h-size1 of-hidden">
			            Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit amet enim orci. Nam eget metus elit.
			          </p>
			          <span className="s-text9">
			            Photo by @nancyward
			          </span>
			        </div>
			      </a>
			    </div>
		);
	}
}

export default InstagramBlock;