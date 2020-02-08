import React, { Component } from 'react';
import "./RegForm.css"
import Login from "./Login"
import Form from "./Form"
import {Route,Link} from "react-router-dom";
class RegForm extends Component{

  constructor(props){
    super(props);
    this.state={
      login: false
    };
    this.handleClick = this.handleClick.bind(this); 
  }
  
  handleClick(e){
    this.setState( x =>{ 
         return({login : !(x.login)}); 
      });
    }
  
  render(){
    let classLeft,classRight;
    if(!this.state.login){
      classLeft = `Regform-Left none`
      classRight = `Regform-Right`
    }
    else{
      classLeft = `Regform-Left`
      classRight = `Regform-Right none`
    }

    return(
      <div className="Regform">
        <div className={classLeft}>
          <p>Already Registered?</p>
          <Link onClick={this.handleClick} className="regBtn" to="/register/login">Log In</Link>
        </div>
        <div className="Regform-Middle">
          
          <Route exact path="/register/login" component={Login} />  
          <Route exact path="/register/form" component={Form} /> 
        </div>
        <div  className={classRight}>
          <p>Don't Have Account?</p>
          <Link onClick={this.handleClick} className="regBtn" 
          to="/register/form">Register Now!</ Link>
        </div>
      </div>
    );
  }
}

export default RegForm;