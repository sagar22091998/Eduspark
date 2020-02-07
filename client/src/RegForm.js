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
         return({login : !(x.login) }); 
      });
    }
    

  render(){
    let classLeft,classRight,classLeftBtn,classRightBtn;
    if(!this.state.login){
      classLeft = `Tatti-Left none`
      classRight = `Tatti-Right`
      classLeftBtn = `btn-dark none`
      classRightBtn = `btn-dark `
    }
    else{
      classLeftBtn = `btn-dark `
      classRightBtn = `btn-dark none`
      classLeft = `Tatti-Left`
      classRight = `Tatti-Right none`
    }

    return(
      <div className="Tatti">
        <div className={classLeft}>
          <p>Already Registered?</p>
          <Link onClick={this.handleClick} className="regBtn" to="/register/login">Login</Link>
        </div>
        <div className="Tatti-Middle">
          {!this.state.login ?
          <Route path="/register/login" component={Login} />  :
          <Route path="/register/form" component={Form} /> }
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