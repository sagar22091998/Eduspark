import React, { Component } from 'react';
import Forms from "../../SubComponents/Forms/Forms"
import "./LoginRegister.scss"
import { returnToTop } from '../../../utils/utilityFunctions'; 

class LoginRegister extends Component{

  componentDidMount(){
    returnToTop();
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