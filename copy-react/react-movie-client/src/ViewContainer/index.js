import React, { Component } from 'react';
import View from '../View';
import Header from '../Header';
import './style.css';

class ViewContainer extends Component{
  constructor(){
    super();

    this.state ={
      currentUser: undefined
    }
  }

  componentDidMount(){
    this.setState({
      currentUser: JSON.parse(localStorage.getItem("userView"))
    });
  }


  render(){
    console.log("State from View Container: ", this.state);
    return(
      <div className='bgOnlyView'>
        <Header/>
        {this.state.currentUser === undefined ? <div> Welcome to View Container </div> : <View currentUser={this.state.currentUser}/> }
      </div>
    );
  }
}


export default ViewContainer;
