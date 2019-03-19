import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import Header from '../Header';
import './style.css';

class EditContainer extends Component{
  constructor(){
    super();

    this.state ={
      username: undefined,
      errorMessage: '',
      successMessage: ''
    }
  }

  componentDidMount(){
    this.setState({
      username: localStorage.getItem("currentUser")
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }



  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Update User clicked!");
    const response = await fetch('http://localhost:9000/api/v1/users/'+ localStorage.getItem("currentUser"), {
      method: 'PUT',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Response from EditContainer: ", response);
    const parsedResponse = await response.json();
    console.log("Parsed Response from EditContainer: ", parsedResponse);

    // If user was updated in the database
    if(response.ok){
      // Update the localStorage element to the new username
      localStorage.setItem("currentUser", this.state.username);

      // Make sure the user is now displayed with the new username when you navigate to all users

      // Display success message
      this.setState({
          errorMessage: '',
          successMessage: parsedResponse.success
      });
    }

    // If user couldn't be updated in the database
    else{
      this.setState({
        errorMessage: parsedResponse.error,
        successMessage: ''
      });
    }
  }



  render(){
    console.log("State from Edit Container: ", this.state);
    return(
      <div className='bgEditUser textalign opacity'>
        <Header/>
        {
          this.state.username === undefined ? 
            <div> Welcome to Edit Container </div> : 
            <Form onSubmit={this.handleSubmit}>
              <Form.Input type='text' name="username" onChange={this.handleChange} placeholder='Edit Username' />
                <Button fluid type="Submit" color="blue">Update User</Button>
            </Form>
        }

        { this.state.errorMessage !== '' ?
            <ErrorMessage errorMessage={this.state.errorMessage}/> : null
        }

        { this.state.successMessage !== '' ?
            <SuccessMessage successMessage={this.state.successMessage}/> : null
        }
      </div>
    );
  }
}


export default EditContainer;
