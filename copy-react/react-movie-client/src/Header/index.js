import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './style.css';


class HeaderApp extends Component{
  constructor(){
    super();

    this.state = {
      activeItem: localStorage.getItem("menuView")
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if(name === 'home'){
      localStorage.setItem('menuView', 'home');
      this.props.history.push('/movies');
    }

    else if(name === 'users'){
      localStorage.setItem('menuView', 'users');
      this.props.history.push('/users');
    }

    else if(name === 'logout'){
      localStorage.setItem('menuView', 'logout');
      this.props.history.push('logout');
    }
  }

  render(){
    const { activeItem } = this.state
    return (
          <Menu color='blue' fluid widths={3} pointing secondary>
              <Menu.Item 
                name='home' 
                active={activeItem === 'home'} 
                onClick={this.handleItemClick} 
              />
              <Menu.Item
                name='users'
                active={activeItem === 'users'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
              />
          </Menu>
      )
    }
}

export default withRouter(HeaderApp);
