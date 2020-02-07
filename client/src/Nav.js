import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./Nav.css"
import { logoutProfile } from './userFunctions'
class Nav extends Component{


  constructor(props){
    super(props);
    this.state={
      sissoko : (localStorage.authToken===undefined)
    };
    this.logout  = this.logout.bind(this); 
  }

  logout(){
    const token = localStorage.authToken
    logoutProfile(token).then(res => {
      localStorage.removeItem('authToken');
      this.setState({sissoko:false});
    })


  }

  render(){
    return(

      <header className="Nav">
        <div className="Nav-container">
          <div className="Nav-Logo"></div>
          <ul>
              <NavLink exact activeClassName="Current" className="Nav-Links" to="/">Home</NavLink>
              <NavLink  activeClassName="Current"  className="Nav-Links" to="/about">About</NavLink>
              {this.state.sissoko ?
              <NavLink  activeClassName="Current" className="Nav-Links" to="/register/login">Register | Login</NavLink>
              :
              <NavLink  activeClassName="Current" className="Nav-Links" to="/profile">Profile</NavLink>}
              {!this.state.sissoko  ?
              <NavLink   className="Nav-Links" to="/" onClick={this.logout}>Logout</NavLink>:null
              }
          </ul>
        </div>
      </header>
    );
  }

}

export default Nav;