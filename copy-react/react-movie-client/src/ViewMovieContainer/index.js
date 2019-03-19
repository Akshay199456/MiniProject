import React, { Component } from 'react';
import ViewMovie from '../ViewMovie';
import Header from '../Header';
import './style.css';

class ViewContainer extends Component{
  constructor(){
    super();

    this.state ={
      currentMovie: undefined
    }
  }

  componentDidMount(){
    this.setState({
      currentMovie: JSON.parse(localStorage.getItem("movieView"))
    });
  }


  render(){
    console.log("State from View Container: ", this.state);
    return(
      <div className='bgMovieView'>
        <Header/>
        {this.state.currentMovie === undefined ? <div> Welcome to View Movie Container </div> : <ViewMovie currentMovie={this.state.currentMovie}/> }
      </div>
    );
  }
}


export default ViewContainer;
