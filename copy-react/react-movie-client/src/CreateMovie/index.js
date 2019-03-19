import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';

class CreateMovie extends Component {
  constructor(){
    super();

    this.state = {
      name: '',
      description: ''
    }
  }
  updateMovie = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }
  render(){
    return (
      <Segment inverted color='blue'>
        <Form onSubmit={this.props.addMovie.bind(null, this.state)}>
          <Form.Input type='text' name='name' value={this.state.name} onChange={this.updateMovie} placeholder='Movie Name'/>
          <Form.Input type='text' name='description' value={this.state.description} onChange={this.updateMovie} placeholder='Movie Description'/>
          <Button color="green" type='Submit'>Create Movie</Button>
        </Form>
      </Segment>
      )
  }
}

export default CreateMovie;
