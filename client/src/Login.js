import React, { Component } from 'react';
import "./Login.css";

class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      userName : "",
      password : ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name] : e.target.value });
  }

  render(){
    return(
        <form className="Login" action="">
          <h1 className="m-heading">Login</h1>
          <label htmlFor="name">Username</label>
          <input 
            type="text" 
            placeholder="Enter Name"
            value={this.state.userName}
            name="userName" 
            id="name"
            onChange={this.handleChange}/>
          <label htmlFor="pass">Password</label>
          <input 
            type="password" 
            placeholder="Enter Username" 
            value={this.state.password}
            name="password"
            id="pass"
            onChange={this.handleChange}
          />
          <input className = "btn" type="submit" value="Login"/>
        </form> 
    );
  }
}

export default Login;