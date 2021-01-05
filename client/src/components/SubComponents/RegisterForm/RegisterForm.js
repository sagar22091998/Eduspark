import React, { Component } from 'react';
import "./RegisterForm.scss";

class RegisterForm extends Component{
  render(){
    const { name , email , password , confirm , profileType , mobile } = this.props;

    return(
      <div className="register">
        <div className="register__fields">
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Enter Name" value={name} name="name" id="name"/>
        </div>
        <div className="register__fields">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" id="email" value={email}
            name="email"/>
        </div>
        <div className="register__fields">
          <label htmlFor="pass1">Password</label>
          <input type="password" placeholder="Enter Password" value={password} name="password" id="pass1"/>
        </div>
        <div className="register__fields">
          <label htmlFor="pass2">Confirm Password</label>
          <input type="password" placeholder="Re-enter Password" id="pass2"
            value={confirm} name="confirm"/>
        </div> 
        <div className="register__fields">
          <label htmlFor="mobile">Mobile Number</label>
          <input type="text" placeholder="Enter Mobile Number" id="mobile"
            value={mobile} name="confirm"/>
        </div> 
        <div className="register__radio">
          <p> Sign In As </p>
          <div className="register__radio__btns">
            <div>
              <input type="radio" name="profileType" value="instructor" checked={profileType === "instructor"}/>Instructor
            </div>
            <div>
              <input type="radio" name="profileType" value="student" checked={profileType === "student"}/>Student
            </div>
          </div>
        </div>
        <div><button className="register__btn" >Register</button></div>
      </div>   
    );
  }
}

export default RegisterForm;