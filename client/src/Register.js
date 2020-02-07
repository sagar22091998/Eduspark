import React, { Component } from 'react';
import Footer from './Footer';
import RegForm from './RegForm';
import Nav from "./Nav"
import "./Register.css"

class Register extends Component{

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <div className="Register ">
        <Nav/>
        <div className="Register-Background">
          <div className="Register-Cover p-1">
            <h1 className="l-heading my-1 text-secondary">Welcome To EduSpark</h1>
            <RegForm/>
          </div>
        </div>     
        <Footer/>
      </div>
    
      );
  }
}

export default Register;