import React, { Component } from "react";
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import store from '../store';

class App extends Component {
	render(){
		return(
			<div>
			  <Header/>	
			  <Content/>
			  <Footer/>
			</div>);
	}
  
};

const render = () => {
	const wrapper = document.getElementById("app");
	ReactDOM.render(
	<Provider store={store}><Router><App /></Router></Provider>, wrapper);
}

render();
store.subscribe(render);
