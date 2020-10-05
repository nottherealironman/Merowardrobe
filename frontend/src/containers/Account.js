import React, { Component } from 'react';
import Login from "../components/Login";
import Signup from "../components/Signup";
import PropTypes from "prop-types";
import { fetchUserInfo } from "../actions/userActions";
import store from "../store";

class Account extends Component{

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('/token-auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

          .then(res => {
              if(res.ok){
                return res.json();
              }
          })
          .then(json =>{
                if(json != undefined){
                    localStorage.setItem('token', json.token);
                    this.props.history.push("/dashboard");
                    store.dispatch(fetchUserInfo());

                }
          });
    }

	render (){
		return (
			<div>
                <Login handle_login={this.handle_login}/>
			</div>
		);
	}
}

export default Account;


