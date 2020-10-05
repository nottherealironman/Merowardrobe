import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { fetchUserInfo, logout } from "../actions/userActions";
import store from "../store";

class Logout extends Component{
	componentDidMount(){
		store.dispatch(logout());
		localStorage.removeItem('token');
		localStorage.removeItem('merowardrobe:state');
		this.props.history.push("/login");
	}

	render() {
        return null;
    }
}

export default Logout;