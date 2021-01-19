import React, { Component } from 'react';
import "./RegisterForm.scss";
import { connect } from "react-redux"
import { setPopup , setAuthFields , registerHandler } from "../../../actions/index"
import { isEmpty } from "../../../utils/validators"
import isEmail from "validator/es/lib/isEmail"
import isMobilePhone from "validator/es/lib/isMobilePhone"

class RegisterForm extends Component{

  handleRegisterFields = (e) =>{
    this.props.setAuthFields(e.target.name,e.target.value)
  }

  handleRegisteration = () =>{
    const { registerName , registerEmail , registerPassword , registerConfirm , registerMobile , setPopup , registerHandler } = this.props;

    if(isEmpty({ registerName , registerEmail , registerPassword , registerConfirm , registerMobile })){
      setPopup(true,"Enter all fields","error")
      return;
    }  
    
    if(!isEmail(registerEmail)){
      setPopup(true,"Invalid email","error")
      return;
    }

    if(registerConfirm !== registerPassword){
      setPopup(true,"Password does not match","error")
      return;
    }
    
    if(registerPassword.length < 8){
      setPopup(true,"Password length should be at least 8","error")
      return;
    }

    if(!isMobilePhone(registerMobile) || registerMobile.length !== 10){
      setPopup(true,"Invalid mobile number","error")
      return;
    }

    registerHandler({registerName , registerEmail , registerPassword , registerMobile});
  }

  componentWillUnmount(){
    //Reseting Fields

    const { setAuthFields } = this.props;
    setAuthFields("registerEmail","")
    setAuthFields("registerPassword","")
    setAuthFields("registerConfirm","")
    setAuthFields("registerMobile","")
    setAuthFields("registerName","")
  }

  render(){
    const { registerName , registerEmail , registerPassword , registerConfirm , registerMobile } = this.props;

    return(
      <div className="register">
        <div className="register__fields">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Enter Name" value={registerName} name="registerName" id="name" onChange={this.handleRegisterFields}/>
        </div>
        <div className="register__fields">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" id="email" value={registerEmail} name="registerEmail" onChange={this.handleRegisterFields}/>
        </div>
        <div className="register__fields">
          <label htmlFor="pass1">Password</label>
          <input type="password" placeholder="Enter Password" value={registerPassword} name="registerPassword" id="pass1" onChange={this.handleRegisterFields}/>
        </div>
        <div className="register__fields">
          <label htmlFor="pass2">Confirm Password</label>
          <input type="password" placeholder="Re-enter Password" id="pass2"
            value={registerConfirm} name="registerConfirm" onChange={this.handleRegisterFields}/>
        </div> 
        <div className="register__fields">
          <label htmlFor="mobile">Mobile Number</label>
          <input type="text" placeholder="Enter Mobile Number" id="mobile"
            value={registerMobile} name="registerMobile" onChange={this.handleRegisterFields}/>
        </div>
        <div><button onClick={this.handleRegisteration} className="register__btn" >Register</button></div>
      </div>   
    );
  }
}

const mapStatesToProps = (state) => { 
  return {
    registerName : state.auth.registerName ,
    registerConfirm : state.auth.registerConfirm ,
    registerMobile : state.auth.registerMobile ,
    registerPassword : state.auth.registerPassword ,
    registerEmail : state.auth.registerEmail
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setAuthFields : (name,value) => dispatch(setAuthFields(name,value)),
    registerHandler : (credentials) => dispatch(registerHandler(credentials))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(RegisterForm);