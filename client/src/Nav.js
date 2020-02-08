import React, { Component } from 'react';
import {NavLink , withRouter} from "react-router-dom";
import "./Nav.css"
import { logoutProfile } from './userFunctions'
class Nav extends Component{

  constructor(props){
    super(props);

  }

  logout(){
    localStorage.authToken = "hell";  
    const token = localStorage.authToken
    logoutProfile(token).then(res => {
      localStorage.removeItem('authToken');
    })
  }


  render(){
    console.log(localStorage.authToken);
    return(
      <header className="Nav">
        <div className="Nav-container">
          <div className="Nav-Logo"></div>
          <ul>
              <NavLink exact activeClassName="Current" className="Nav-Links" to="/">Home</NavLink>
              <NavLink  activeClassName="Current"  className="Nav-Links" to="/about">About</NavLink>
              {localStorage.authToken===undefined || localStorage.authToken==="hell"?
              <NavLink  activeClassName="Current" className="Nav-Links" to="/register/login">Register | Login</NavLink>
              :
              <NavLink  activeClassName="Current" className="Nav-Links" to="/profile">Profile</NavLink>}
              {localStorage.authToken!==undefined && localStorage.authToken!=="hell" ?
              <NavLink   className="Nav-Links" to="/" onClick={this.logout}>Logout</NavLink>:null
              }
          </ul>
        </div>
      </header>
    );
  }

}

export default withRouter(Nav);