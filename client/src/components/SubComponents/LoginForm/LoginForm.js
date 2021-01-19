import React, { Component } from 'react';
import "./LoginForm.scss";
import { connect } from "react-redux"
import { setPopup , setAuthFields , loginHandler } from "../../../actions/index"
import { isEmpty } from "../../../utils/validators"
import isEmail from "validator/es/lib/isEmail"

class LoginForm extends Component{

  handleLoginFields = (e) =>{
    this.props.setAuthFields(e.target.name,e.target.value)
  }

  handleLogin = () =>{
    const { inputPassword , inputEmail , loginHandler , setPopup } = this.props;

    if(isEmpty({inputPassword,inputEmail})){
      setPopup(true,"Enter All Fields","error")
      return;
    }  
    
    if(!isEmail(inputEmail)){
      setPopup(true,"Invalid Email","error")
      return;
    }  
    loginHandler({inputPassword,inputEmail});
  }

  componentWillUnmount(){
    //Reseting Fields

    const { setAuthFields } = this.props;
    setAuthFields("inputPassword","")
    setAuthFields("inputEmail","")
  }

  render(){
    const { inputEmail , inputPassword } = this.props;

    return(
      <div className="login">
        <h1 className="login__head">Login</h1>
        <div className="login__fields">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" value={ inputEmail }name="inputEmail" id="name" onChange={this.handleLoginFields}/>
        </div>
        <div className="login__fields">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" value={ inputPassword }  name="inputPassword" id="password" onChange={this.handleLoginFields}/>
        </div>
        <button onClick={this.handleLogin} className="login__btn">Login</button>
      </div> 
    );
  }
}

const mapStatesToProps = (state) => { 
  return {
    inputEmail : state.auth.inputEmail,
    inputPassword : state.auth.inputPassword
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setAuthFields : (name,value) => dispatch(setAuthFields(name,value)),  loginHandler : (credentials) => dispatch(loginHandler(credentials))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(LoginForm);