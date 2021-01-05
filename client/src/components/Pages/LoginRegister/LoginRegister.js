import React, { Component } from 'react';
// import RegForm from '../../../RegForm';
import Forms from "../../SubComponents/Forms/Forms"
import "./LoginRegister.scss"

class LoginRegister extends Component{

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <div className="loginreg">
        <div className="loginreg__container">
          <h1 className="loginreg__container--head">Welcome To EduSpark</h1>
          <Forms/>
        </div>
      </div>
    );
  }
}

export default LoginRegister;