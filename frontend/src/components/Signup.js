import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios'; // HTTP request to server
import { fetchUserInfo } from "../actions/userActions";
import store from "../store";
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup'; // Form Validation
/*
class Signup extends Component{
	state = {
	    name : '',
	    email: '',
	    group: '',
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

  handle_signup = (e, data) => {
        e.preventDefault();

        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        axios({
          method : 'post',
          url : '/users/api/signup/',
          data : JSON.stringify(data),
          headers : {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          localStorage.setItem('token', res.data.token);
          this.props.history.push("/dashboard");
          store.dispatch(fetchUserInfo());
        });
    }

	render (){
		return (
			<section id="form">
			  <div className="container">
			    <div className="row">
			      <div className="col-sm-4 col-sm-offset-1">
			        <div className="login-form">
			          <h2>Let's Get Started</h2>
                <form role="form" onSubmit={e => this.handle_signup(e, this.state) }>
                        <div className="form-group row">
                            <div className="col-md-5">
                              <label>
                                  <input
                                  type="radio"
                                  name="group"
                                  defaultValue={2}
                                  onChange={this.handle_change}
                                  />
                                      Retailer</label>
                              </div>
                              <div className="col-md-5">    
                                  <label>
                                  <input
                                  type="radio"
                                  name="group"
                                  defaultValue={3}
                                  onChange={this.handle_change}
                                  />
                                      Customer</label>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-12">
                              <div className="bo4 of-hidden av__input__box m-b-15">
                                <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="sizefull s-text7 p-l-22 p-r-22"
                                onChange={this.handle_change}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-12">
                              <div className="bo4 of-hidden av__input__box m-b-15">
                                <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="sizefull s-text7 p-l-22 p-r-22"
                                onChange={this.handle_change}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-12">
                              <div className="bo4 of-hidden av__input__box m-b-15">
                                <input
                                type="text"
                                name="email"
                                placeholder="Email ID"
                                className="sizefull s-text7 p-l-22 p-r-22"
                                readonly onfocus="this.removeAttribute('readonly');"
                                onChange={this.handle_change}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-12">
                              <div className="bo4 of-hidden av__input__box m-b-15">
                                <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="sizefull s-text7 p-l-22 p-r-22"
                                aria-autocomplete="list"
                                autocomplete="off"
                                onChange={this.handle_change}/>
                              </div>
                            </div>
                          </div>
                          <button type="submit" className="flex-c-m av__btn__fullwidth bg1 hov1 m-text3 trans-0-4">Signup</button>
                        </form>
			        </div>
			      </div>
			    </div>
			  </div>
			</section>
		);
	}
}

export default Signup;

Signup.propTypes = {
    handle_signup: PropTypes.func.isRequired
};*/



const SignupForm =({
	values,
	errors,
	touched,
	isSubmitting,
	handleSubmit,
	}) => {
			return (
			<section id="form">
			  <div className="container">
			    <div className="row">
			      <div className="col-sm-4 col-sm-offset-1">
			        <div className="login-form">
			          <h2>Let's Get Started</h2>
                        <Form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                <div className="col-md-12">
                                    <div class="row">
                                    <div className="col-md-5">
                                      <label>
                                          <Field
                                          type="radio"
                                          name="group"
                                          value={2}
                                          defaultValue={2}
                                          />
                                              Retailer</label>
                                      </div>
                                      <div className="col-md-5">
                                          <label>
                                          <Field
                                          type="radio"
                                          name="group"
                                          value={3}
                                          defaultValue={3}
                                          />
                                              Customer</label>
                                    </div>
                                    </div>
                                    { touched.group && errors.group && <div class="input-feedback"> {errors.group} </div> }
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <div className="col-md-12">
                                      <div className="bo4 of-hidden av__input__box m-b-15">
                                        <Field
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="sizefull s-text7 p-l-22 p-r-22"
                                        />
                                      </div>
                                        { touched.username && errors.username && <div class="input-feedback"> {errors.username} </div> }
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <div className="col-md-12">
                                      <div className="bo4 of-hidden av__input__box m-b-15">
                                        <Field
                                        type="text"
                                        name="email"
                                        placeholder="Email ID"
                                        className="sizefull s-text7 p-l-22 p-r-22"
                                        />
                                      </div>
                                        { touched.email && errors.email && <div class="input-feedback"> {errors.email} </div> }
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <div className="col-md-12">
                                      <div className="bo4 of-hidden av__input__box m-b-15">
                                        <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="sizefull s-text7 p-l-22 p-r-22"
                                        aria-autocomplete="list"/>
                                      </div>
                                      { touched.password && errors.password && <div class="input-feedback"> {errors.password} </div> }
                                    </div>
                                  </div>
                                  <button type="submit" disabled={isSubmitting} className="flex-c-m av__btn__fullwidth bg1 hov1 m-text3 trans-0-4">Signup</button>
                                </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
		);
}

const Signup = withFormik({
	mapPropsToValues({
		group,
		username,
		email,
		password,
		}) {
		    return {
		      group: group || '',
		      username: username || '',
		      email: email || '',
		      password: password || ''
		    }
  	},

	validationSchema: Yup.object().shape({
	    group: Yup.number().required('Please select account type'),
	    username : Yup.string().typeError('Username must be text').required('Username is required'),
	    email: Yup.string().email().required('Email is required'),
	    password: Yup.string().required('Password is required'),
	}),

  	handleSubmit(values, { props, resetForm, setErrors, setSubmitting}){
  		axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios({
          method : 'post',
          url : '/users/api/signup/',
          data : JSON.stringify(values),
          headers : {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          localStorage.setItem('token', res.data.token);
          props.history.push("/dashboard");
          store.dispatch(fetchUserInfo());
        });
  	}

})(SignupForm);

export default Signup;


