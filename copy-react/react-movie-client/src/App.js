import React, { Component } from 'react';
import './App.css';
import MovieContainer from './MovieContainer';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import UserContainer from './UserContainer';
import ViewContainer from './ViewContainer';
import EditContainer from './EditContainer';
import ViewMovieContainer from './ViewMovieContainer';
import { Route, Switch } from 'react-router-dom';

const My404 = () => {
  return (
    <div className='bg404'>
    </div>
    )
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/logout" component={Logout}/>
          <Route exact path="/movies" component={MovieContainer}/>
          <Route exact path="/users" component={UserContainer}/>
          <Route exact path='/view' component={ViewContainer}/>
          <Route exact path='/edit' component={EditContainer}/>
          <Route exact path = '/viewmovie' component={ViewMovieContainer}/>
          <Route component={My404}/>
        </Switch>
      </div>
    );
  }
}

export default App;
