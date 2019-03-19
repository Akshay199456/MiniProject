import React from 'react';
import { Card, Button} from 'semantic-ui-react';
// Pure Function, takes an input and renders ui
const Movies = (props) => {
  console.log("Props from Movie List: ", props);
  // you'll propably have to map over the movies and create your list items here
  const movies = props.movies.map((movie, i) => {
    return (
      <Card key={movie.id} color='yellow' fluid>
        <Card.Content>
          <Card.Header>{movie.name}</Card.Header>
          <Card.Description>{movie.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color="blue" onClick={props.showMovie.bind(null, movie.id)}>View Movie</Button>
          { localStorage.getItem("currentUser") === movie.user.username ? <Button color="green" onClick={props.openAndEdit.bind(null, movie)}>Edit Movie</Button> : null}
          { localStorage.getItem("currentUser") === movie.user.username ? <Button color="red" onClick={props.deleteMovie.bind(null, movie.id)}>Delete Movie</Button> : null}
        </Card.Content>
      </Card>
      )
  })

  return (
    <div>
      <h3>Movies</h3>
      <Card.Group className="centered">
        {movies}
      </Card.Group>
    </div>
    )
}


export default Movies;
