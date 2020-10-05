import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

class Base extends Component{
	render(){
		return (
			<section className="bgwhite p-t-66 p-b-60">
		        <div className="container">
		            <div className="row">
		            	<Sidebar/>
		            	<Content/>
		            </div>
		        </div>
	        </section>
		);
	}
}

export default Base;