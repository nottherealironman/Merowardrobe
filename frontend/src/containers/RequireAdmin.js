import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import store from "../store";

export default function RequireAdmin(Component, props){

    class AuthHOC extends Component{
        componentWillMount(){
            console.log(props.user)
            if(!props.user.logged_in){
                this.props.history.push("/login");
            }
        }

        /*componentWillReceiveProps(nextProps) {
            const { user } = store.getState();
            //console.log(user)
            console.log('will receive')
        }*/

        render() {
            return props.user.logged_in? <Component/> : null;
        }


    }

    return AuthHOC;
}