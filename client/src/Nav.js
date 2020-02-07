import React, { Component } from 'react';
import {NavLink,Switch} from "react-router-dom";
import "./Nav.css"
class Nav extends Component{

  constructor(props){
    super(props);
    this.state = {
      menuItems : ["HOME" , "REGISTER"],
    };
  }

  render(){
    return(
      
      <header className="Nav">
        <div className="Nav-container">
          <div className="Nav-Logo"></div>
          <ul>
              <NavLink exact activeClassName="Current" className="Nav-Links" to="/">Home</NavLink>
              <NavLink  activeClassName="Current"  className="Nav-Links" to="/about">About</NavLink>
              <NavLink  activeClassName="Current" className="Nav-Links" to="/register/login">Register | Login</NavLink>
          </ul>
        </div>
      </header>
    );
  }

}

export default Nav;