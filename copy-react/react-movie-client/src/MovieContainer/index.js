import React, { Component } from 'react';
import CreateMovie from '../CreateMovie';
import MovieList from '../MovieList';
import EditMovie from '../EditMovie';
import SuccessMessage from '../SuccessMessage';
import ErrorMessage from '../ErrorMessage';
import Header from '../Header';
import { Grid } from 'semantic-ui-react';
import './style.css';

class MovieContainer extends Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      movieToEdit: {
        name: '',
        description: '',
        id: '',
        user: {}
      },
      showEditModal: false,
      successMessage: '',
      errorMessage: ''
    }
  }


  getMovies = async () => {
    const response = await fetch('http://localhost:9000/api/v1/movies', {
      credentials: 'include'
    });

    console.log("Response from getMovies: ", response);
    if(response.ok){
      const parsedResponse = await response.json();
      console.log("Parsed response from getMovies: ", parsedResponse);
      this.setState({
        movies: parsedResponse.movies
      });
    }

  }

  showMovie = async (id) =>{
    console.log("Show Movie clicked! Id of movie to view: ", id);
    const response = await fetch('http://localhost:9000/api/v1/movies/' + id, {
      credentials: 'include'
    });

    console.log("Response from show movie: ", response);
    if(response.ok){
      const parsedResponse = await response.json();
      console.log("Parsed response from show movie: ", parsedResponse);
      localStorage.setItem("movieView", JSON.stringify(parsedResponse));
      this.props.history.push("/viewmovie")
    }

  }


  componentDidMount(){
    this.getMovies();
  }


  addMovie = async (movie, e) => {
    // .bind arguments take presidence over every other argument
    try{
      e.preventDefault();
      console.log("Movie from addMovie: ", movie);
      const response = await fetch('http://localhost:9000/api/v1/movies', {
        method: 'POST',
        credentials: 'include', // this sends our session cookie with our request
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response from addMovie: ", response);
      const parsedResponse = await response.json();
      console.log("Parsed Response from adddMovie: ", parsedResponse);
      
      if(response.ok){
        this.setState({
          errorMessage: '',
          successMessage: parsedResponse.success
        });

        // Update the movies list
        this.getMovies();
      }

      else{
        this.setState({
          errorMessage: parsedResponse.error,
          successMessage: ''
        });
      }


    } 
    catch(err){
      console.log('error')
      console.log(err)
    }
  }



  deleteMovie = async (id) => {
    console.log("Delete movie clicked!");
    console.log("Id of movie to delete: ", id);

    const response = await fetch('http://localhost:9000/api/v1/movies/'+ id, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
            'Content-Type': 'application/json'
          }
    });

    console.log("Response from deleteMovie: ", response);
    const parsedResponse = await response.json();
    if(response.ok){
      this.setState({
        errorMessage: '',
        successMessage: parsedResponse.success
      });

      //Update movie array
      this.getMovies();
    }
  }




  handleEditChange = (e) => {

    this.setState({
      movieToEdit: {
        ...this.state.movieToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      }
    });
  }




  closeAndEdit = async (e) => {
    // Put request,

    // If you feel up to make the modal (EditMovie Component) and show at the appropiate times

    console.log("State at closeAndEdit: ", this.state);

    // Make the put request
    const response = await fetch('http://localhost:9000/api/v1/movies/'+ this.state.movieToEdit.id, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(this.state.movieToEdit),
      headers: {
            'Content-Type': 'application/json'
          }
    });

    //  Getting the parsed response
    const parsedResponse = await response.json();

    // Movie successfully updated
    if(response.ok){
      this.setState({
        errorMessage: '',
        successMessage: parsedResponse.success
      });
    }

    // Error encountered while updating movie
    else{
      this.setState({
        errorMessage: parsedResponse.error,
        successMessage: ''
      });
    }

    // Close the modal
    this.setState({
      showEditModal: false
    });

    // Render the updated movie in the movies route
    this.getMovies();



  }



  openAndEdit = (movieFromTheList) => {
    console.log("Edit button clicked");
    // console.log(movieFromTheList, ' movieToEdit  ');
    console.log("Movie from the openAndEdit methods: ", movieFromTheList);


    this.setState({
      showEditModal: true,
      movieToEdit: {
        ...movieFromTheList
      }
    })


    // movieToEdit = {
    //   title: movieFromTheList.title,
    //   description: movieFromTheList.description
    // }
  }



  render(){
    console.log("State from MovieContainer: ", this.state);
    return (
      <div>
        <Header/>
        <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
          <Grid.Row>
            <Grid.Column className='bg'>
              <CreateMovie addMovie={this.addMovie}/>
              { this.state.errorMessage !== '' ?
                <ErrorMessage errorMessage={this.state.errorMessage}/> : null
              }

              { this.state.successMessage !== '' ?
                <SuccessMessage successMessage={this.state.successMessage}/> : null
              }
            </Grid.Column>

            <Grid.Column>
              <MovieList movies={this.state.movies} showMovie={this.showMovie} deleteMovie={this.deleteMovie} openAndEdit={this.openAndEdit}/>
            </Grid.Column>
            <EditMovie open={this.state.showEditModal} movieToEdit={this.state.movieToEdit} handleEditChange={this.handleEditChange} closeAndEdit={this.closeAndEdit}/>
          </Grid.Row>
        </Grid>
      </div>
      )
  }
}

export default MovieContainer;
