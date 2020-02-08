import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Nav.css"
import { logoutProfile } from './userFunctions'
class Nav extends Component{

  logout(){
    localStorage.authToken = "hell";  
    const token = localStorage.authToken
    logoutProfile(token).then(res => {
      localStorage.removeItem('authToken');
    })
  }


  render(){

    let classHome = "Nav-Links";
    let classAbout = "Nav-Links";
    let classProfile = "Nav-Links";
    let classRegister = "Nav-Links";
    
    if(this.props.current==="Home")
      classHome+=" Current";
    if(this.props.current==="About")
      classAbout+=" Current";
    if(this.props.current==="Profiles")
      classProfile+=" Current";
    if(this.props.current==="Register")
      classRegister+=" Current";
    return(
      <header className="Nav">
        <div className="Nav-container">
          <div className="Nav-Logo"></div>
          <ul>
              <Link className={classHome} to="/">Home</Link>
              <Link className={classAbout} to="/about">About</Link>
              {localStorage.authToken===undefined || localStorage.authToken==="hell"?
              <Link className={classRegister} to="/register/login">Register | Login</Link>
              :
              <Link className={classProfile} to="/profile">Profile</Link>}
              {localStorage.authToken!==undefined && localStorage.authToken!=="hell" ?
              <Link className="Nav-Links" to="/" onClick={this.logout}>Logout</Link>:null
              }
          </ul>
        </div>
      </header>
    );
  }

}

export default (Nav);