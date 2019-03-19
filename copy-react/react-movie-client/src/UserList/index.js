import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import './style.css';
// Pure Function, takes an input and renders ui

// onClick={props.openAndEdit.bind(null, user)}


const UserList = (props) => {
  // you'll propably have to map over the movies and create your list items here
  const users = props.allUsers.map((user, i) => {
    return (
      <Card key={user.id} color='yellow'>
        <Card.Content>
          <Card.Header>{user.id}</Card.Header>
          <Card.Description>{user.username}</Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Button color="green" onClick={props.viewUser.bind(this, user.username)}> View User </Button>
          { localStorage.getItem("currentUser") === user.username ? <Button color="blue" onClick={props.editUser.bind(this, user.username)}> Edit User  </Button> : null}
          { localStorage.getItem("currentUser") === user.username ? <Button color="red" onClick={props.deleteUser.bind(this, user.username)}> Delete User  </Button> : null}
        </Card.Content>
      </Card>
      )
  })

  return (
    <div>
      <Card.Group className="bgUser textCenter" itemsPerRow={2}>
        {users}
      </Card.Group>
    </div>
    )
}


export default UserList;
