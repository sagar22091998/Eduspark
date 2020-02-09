import React, { Component } from 'react';
import axios from 'axios'
import "./Form.css";



class Form extends Component{
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      profileType: '',
      error : false ,
      errorType : ""
    };
    this.handleError=this.handleError.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSumbit=this.handleSumbit.bind(this);
    this.resetUserInputs=this.resetUserInputs.bind(this);
  }   
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSumbit(e){
    
    e.preventDefault();
    const {name,email,password,profileType,confirm} =  this.state; 
    
    if(name==="" || email==="" || password==="" || profileType==="" ||confirm===""){
      this.handleError("Please Fill Out All the Fields");
      return;
    }
    
    if(this.state.confirm!==this.state.password){
        this.handleError("Passwords Dont Match");
        return;
      }
      
    if(password.length<8){
    this.handleError("Password length should be greater than 7");
    return;
     }
 
    const payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      profileType: this.state.profileType
    }

    axios({
      url: '/profiles',
      method: 'POST',
      data: payload
    }).then((res)=>{
      console.log('Data has been send to server')
      localStorage.setItem('authToken', res.data.token)
      this.props.history.push('/')
    }).catch((err)=> {
      this.handleError("Email Already Exists");
      this.resetUserInputs();
      console.log(err)
      console.log('Internal server error')
    })

  }

  resetUserInputs(){
    this.setState({
      name: '',
      email: '',
      password: '',
      profileType: '',
      confirm: ''
    })
  }

  handleError( type ){

    if(!this.state.error){
      this.setState(  x => ({error : !x.error}) );
    }
    
    this.setState({errorType : type });

  }

  render(){
    return(
      <form className="Form" onSubmit={this.handleSumbit}>
        {this.state.error ? <label className="Error"> {this.state.errorType} </label> :null }
        <div className="Form-Set">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            placeholder="Enter Name"
            value={this.state.name}
            name="name" 
            id="name"
            onChange={this.handleChange}/>
        </div>
        <div className="Form-Set">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            id="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="Form-Set">
          <label htmlFor="pass1">Password</label>
          <input 
            type="password" 
            placeholder="Enter Password"
            value={this.state.password}
            name="password"
            id="pass1"
            onChange={this.handleChange}/>
        </div>
         <div className="Form-Set">
          <label htmlFor="pass2">Confirm Password</label>
          <input 
            type="password" 
            placeholder="Re-enter Password"
            id="pass2"
            value={this.state.confirm}
            name="confirm"
            onChange={this.handleChange}
            />
        </div> 
        <div className="Register-Type">
          <p> Sign In As </p>
          <input type="radio" name="profileType" value="instructor"  checked={this.state.profileType === "instructor"} onChange={ this.handleChange }/> Instructor 
          <input type="radio" name="profileType" value="student"  checked={this.state.profileType === "student"} onChange={ this.handleChange }/> Student
        </div>
        <input className = "btn" type="submit" value="Register"/>
      </form>   
    );
  }
}

export default Form;