import React, { Component } from 'react';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import './style.css';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      verify_password: '',
      errorMessage: '',
      successMessage: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit = async (e) => {
    e.preventDefault()
    const usernameRegex = /^[\w]{3,10}$/
    const passwordRegex = /^[\w]{3,10}$/

    const usernameTest = usernameRegex.test(this.state.username);
    const passwordTest = passwordRegex.test(this.state.password);
    const verifyPasswordTest = passwordRegex.test(this.state.verify_password);
    
    if(usernameTest && passwordTest && verifyPasswordTest){
      console.log("Register submit state: ", this.state)

      // If the user's password and verify_password match, want to make a POST request to the server in 
      // order to register the user.
      const loginResponse = await fetch('http://localhost:9000/api/v1/register', {
        method: 'POST',
        credentials: 'include', // this sends our session cookie with our request
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Login Response: ",loginResponse);
      

      if(loginResponse.ok){
          // to remove error message on successful authentication
          this.setState({
            errorMessage: '',
            successMessage: 'User has been created'
          });

          // getting parsed response
          const parsedResponse = await loginResponse.json();
          console.log("Parsed Login Response: ", parsedResponse);

          // Setting a front end cookie to indicate the user is logged in
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("currentUser", this.state.username);
          localStorage.setItem("menuView", 'home');

          // Push to movies route
          this.props.history.push('/movies');
      }


      else{
          // getting parsed response
          const parsedResponse = await loginResponse.json();
          console.log("Parsed Login Error Response: ", parsedResponse);
          // To display error message 
          this.setState({
            errorMessage: parsedResponse.error,
            successMessage: ''
          });
        }
    }

    // If username does not meet regex standard
    else if(!usernameTest){
      this.setState({
          errorMessage: "Username does not meet standard. Username must be alphanumeric with atleast 3 and atmost 10 characters",
          successMessage: '' 
        });
    }

    // If password does not meet regex standard
    else if(!passwordTest){
      this.setState({
          errorMessage: "Password does not meet standard. Password must be alphanumeric with atleast 3 and atmost 10 characters",
          successMessage: '' 
        });
    }

    // If verify_password does not meet regex standard
    else if(!verifyPasswordTest){
      this.setState({
          errorMessage: "Verify Password does not meet standard. Verify Password must be alphanumeric with atleast 3 and atmost 10 characters",
          successMessage: '' 
        });
    }
  }


  moveToLogin = () =>{
    this.props.history.push('/login');
  }


  render(){
    return (
      <div className='register-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <span className='webNameRegister'> Movie Pool </span>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form className="opacity" size='large' onSubmit={this.handleSubmit}>
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

                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    name='verify_password'
                    placeholder='Verify Password'
                    type='password'
                    onChange={this.handleChange}
                  />

                  <Button type="Submit" color='blue' fluid size='large'>
                    Register
                  </Button>
                </Segment>
              </Form>
              <Message>
                Already have an account? <button className='link-view' onClick={this.moveToLogin}>Sign In</button>
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

export default Register;
