import React, { Component } from 'react';
import UserList from '../UserList';
import Header from '../Header';

class UserContainer extends Component{
	constructor(){
		super();

		this.state ={
			allUsers: ''
		}

	}

	componentDidMount(){
		this.getAllUsers();
	}

	getAllUsers = async () => {
		const response = await fetch('http://localhost:9000/api/v1/users/au', {
			credentials: 'include'
		});

		console.log("Users Response:", response);
		if(response.ok){	
			const parsedResponse = await response.json();
			console.log("Parsed User Response: ", parsedResponse);
			this.setState({
				allUsers: parsedResponse.users
			});
		}
	}

	viewUser = async (username) =>{
		console.log("View User clicked! User: ", username);
		const response = await fetch('http://localhost:9000/api/v1/users/'+ username, {
			credentials: 'include'
		});

		console.log("Response from viewUser method: ", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Parsed Response from viewUser: ", parsedResponse);
			localStorage.setItem("userView", JSON.stringify(parsedResponse));

			// console.log("Storage item from User container: ", localStorage.getItem("userView"));
			this.props.history.push('/view');

			// this.props.history.push('/view');
		}
	}

	editUser = (username) =>{
		console.log("Edit User Clicked! User: ", username);
		// Redirect to the EditView container
		this.props.history.push('/edit');
	}

	deleteUser = async (username) =>{
		console.log("Delete User Clicked! User: ", username);
		const response = await fetch('http://localhost:9000/api/v1/users/'+ username, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
      		  'Content-Type': 'application/json'
      		}
		});

		console.log("Response from deleteUser: ", response);
		
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Parsed response from deleteUser: ", parsedResponse);
			// On successful deletion, reload state with updated userbase
			// this.getAllUsers();
			// Redirect to logout since user has been deleted
			this.props.history.push('/logout');

		}

	}

	render(){
		console.log("State from User Container: ", this.state);
		return(
			<div>
				<Header/>
				{this.state.allUsers.length !== 0 ? <UserList allUsers={this.state.allUsers} viewUser={this.viewUser} editUser={this.editUser} deleteUser={this.deleteUser}/> : null}
			</div>
		);
	}
}

export default UserContainer;