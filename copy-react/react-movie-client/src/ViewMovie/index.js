import React from 'react';
import { Card } from 'semantic-ui-react';
// commenting code

const ViewMovie = (props) => {
	return (
		<Card fluid color='yellow' className="textCenter opacity">
			<Card.Content>
				<Card.Header> {props.currentMovie.movie.name} </Card.Header>
				<Card.Description> {props.currentMovie.movie.description} </Card.Description>
			</Card.Content>
			<Card.Content extra>
				<h2> Movie ID: {props.currentMovie.movie.id} </h2>
				<h2> Post Created By User: {props.currentMovie.movie.user.username} </h2>
				<h2> User ID: {props.currentMovie.movie.user.id} </h2>
			</Card.Content>
		</Card>
    );
}

export default ViewMovie

