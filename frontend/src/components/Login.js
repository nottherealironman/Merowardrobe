import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Login extends Component{
	state = {
	    email: '',
	    password:''
	};

	handle_change = e => {
	    const name = e.target.name;
	    const value = e.target.value;
	    this.setState(prevstate =>{
	        const newState = {...prevstate};
	        newState[name] = value;
	        return newState;
	    });
	};

	render (){
		return (
			<section id="form">
			  <div className="container">
			    <div className="row">
			      <div className="col-sm-4 col-sm-offset-1">
			        <div className="login-form">
			          <h2>Login to your account</h2>
                        <form role="form" onSubmit={e => this.props.handle_login(e, this.state)}>
                                <div className="form-group row">
                                  <label htmlFor="staticEmail" className="col-md-4 col-form-label"><label htmlFor="id_email">Email:</label></label>
                                  <div className="col-md-8">
                                    <div className="bo4 of-hidden av__input__box m-b-15">
                                      <input
                                      type="text"
                                      name="username"
                                      placeholder="Email ID"
                                      className="sizefull s-text7 p-l-22 p-r-22"
                                      onChange={this.handle_change} />
                                    </div>
                                  </div>
                                  <div className="col-sm-offset-2 col-sm-2">
                                    <span className="text-danger small" />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label htmlFor="staticEmail" className="col-md-4 col-form-label"><label htmlFor="id_password">Password:</label></label>
                                  <div className="col-md-8">
                                    <div className="bo4 of-hidden av__input__box m-b-15">
                                      <input
                                      type="password"
                                      name="password"
                                      placeholder="Password"
                                      className="sizefull s-text7 p-l-22 p-r-22"
                                      onChange={this.handle_change}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-offset-2 col-sm-2">
                                    <span className="text-danger small" />
                                  </div>
                                </div>
                                <span>
                                  <input type="checkbox" className="checkbox" />
                                  Keep me signed in
                                </span>
                                <button type="submit" className="flex-c-m av__btn__fullwidth bg1 hov1 m-text3 trans-0-4">Login</button>
                        </form>
			        </div>
			      </div>
			    </div>
          Haven't registered yet?
          <Link to="/signup">
               Sign up
          </Link>
			  </div>
			</section>
		);
	}
}

export default Login;

Login.propTypes = {
    handle_login: PropTypes.func.isRequired
};


