import React from 'react';
import { Card } from 'semantic-ui-react';
// Pure Function, takes an input and renders ui

// onClick={props.openAndEdit.bind(null, user)}


const View = (props) => {
	return (
		<Card fluid color='yellow' className="textCenter opacity ">
		    <Card.Content>
	          <Card.Header> User: {props.currentUser.username}</Card.Header>
	          <Card.Description> ID: {props.currentUser.id}</Card.Description>
	        </Card.Content>
        </Card>
    )
}

export default View

