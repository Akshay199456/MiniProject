import React, { Component } from 'react';
import './style.css';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }


  moveToRegister = () =>{
    this.props.history.push('/register');
  }


  handleSubmit = async (e) => {
    e.preventDefault();

    const loginResponse = await fetch('http://localhost:9000/api/v1/login', {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Login Response: ", loginResponse);
    const parsedResponse = await loginResponse.json();
    console.log("Login Parsed Response: ", parsedResponse);

    // If user was successfully logged in
    if(loginResponse.ok){
      this.setState({
          errorMessage: '',
          successMessage: 'User has successfully logged in'
      });

      // Setting a front end cookie to indicate the user is logged in
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("currentUser", this.state.username);
      localStorage.setItem("menuView", 'home');

      // Push to movies route
      this.props.history.push('/movies');
    }

    // Display error message for login
    else{
      this.setState({
        errorMessage: parsedResponse.error,
        successMessage: ''
      });
    }
  }



  render(){
    return (
        <div className='login-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <span className='webNameLogin'> Movie Pool </span>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form className='opacity' size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input fluid icon="user" iconPosition='left' placeholder='Username' type='text' name="username" onChange={this.handleChange} />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange}
                  />

                  <Button type="Submit" color='blue' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <button className="link-view" onClick={this.moveToRegister}>Sign Up</button>
              </Message>

              { this.state.errorMessage !== '' ?
                  <ErrorMessage errorMessage={this.state.errorMessage}/> : null
              }

              { this.state.successMessage !== '' ?
                  <SuccessMessage successMessage={this.state.successMessage}/> : null
              }

            </Grid.Column>
          </Grid>
        </div>
    )
  }
}

export default Login;
