import React, { Component } from 'react';
import Header from '../Header';

class Logout extends Component{
	constructor(){
		super();

		this.state={
			message: ''
		}
	}

	componentDidMount(){
		this.logout();
	}

	logout = async () =>{
		const response = await fetch('http://localhost:9000/logout', {
	    	credentials: 'include'
	  	});
		console.log("Logout Response: ", response);
		const parsedResponse = await response.json();
		console.log("Logout Parsed Response: ", parsedResponse);

		if(response.ok){
			this.setState({
				message: parsedResponse.message
			});

			// Deleting all the front end cookies
			localStorage.removeItem("loggedIn");
			localStorage.removeItem("currentUser");
			localStorage.removeItem("userView");
			localStorage.removeItem("movieView");
			localStorage.removeItem("menuView");

			// Redirect to login
			this.props.history.push('/login');
		}

		else{
			this.setState({
				message: "You are not logged in!"
			})
		}
	}

	render(){
		return(
			<div>
				<Header/>
			</div>
		);
	}
}

export default Logout
