import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';
import './style.css';

const EditMovie = (props) => {
  console.log(props)
  return (
    <Modal size='tiny' open={props.open} dimmer='blurring' centered={false}>
      <Header textAlign="center">Edit Movie</Header>
      <Modal.Content>
        <Form onSubmit={props.closeAndEdit}>
          <Label>
          Edit Movie Title:
          </Label>
          <Form.Input type='text' name='name' value={props.movieToEdit.name} onChange={props.handleEditChange}/>
          <Label>
          Edit Movie Description:
          </Label>
          <Form.Input type='text' name='description' value={props.movieToEdit.description} onChange={props.handleEditChange}/>

          <Modal.Actions>
            <Button fluid color='green' type='submit'>Confirm Movie Edit</Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
    )
}

export default EditMovie;
