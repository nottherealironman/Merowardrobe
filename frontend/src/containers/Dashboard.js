import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { fetchUserInfo } from "../actions/userActions";
import store from "../store";

class Dashboard extends Component{

	render(){
		return (
				<section className="bgwhite p-t-66 p-b-60">
			        <div className="container">
			            <div className="row">
			            	<Sidebar/>
			            	Welcome,  {this.props.user.userinfo.username}
			            	{/*<Switch>
							    <Route exact path='/product' render={()=><DisplayProduct productInfo={ productInfo }/>}/>
						    </Switch>*/}
			            </div>
			        </div>
		        </section>);
	}
}

const mapStateToProps = (state)=> {
  return { user : state.user };
}

export default connect(mapStateToProps)(Dashboard);