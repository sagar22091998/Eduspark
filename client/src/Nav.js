import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Nav.css"
import axios from 'axios';
import { withRouter } from 'react-router';
class Nav extends Component{

  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){  
    const token = localStorage.authToken
    axios({
      url: '/logout',
      method: 'POST',
      headers: {Authorization: `Bearer ${token}`}
    }).then((res) => {
      console.log('Logout successfull')
      localStorage.removeItem('authToken')
      this.props.history.push('/')
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
              {localStorage.authToken===undefined ?
              <Link className={classRegister} to="/register/login">Register | Login</Link>
              :
              <Link className={classProfile} to="/profile">Profile</Link>}
              {localStorage.authToken!==undefined ?
              <Link className="Nav-Links" to="/" onClick={this.logout}>Logout</Link>:null
              }
          </ul>
        </div>
      </header>
    );
  }

}

export default withRouter(Nav);