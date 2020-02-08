import React, { Component } from 'react';
import "./Login.css";
import axios from 'axios';

class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      email : "",
      password : "",
      error:false
    };
  }

  handleChange =({ target }) => {
    const { name, value } = target
    this.setState({[name]: value})
  }

  submit = (event) => {
    event.preventDefault();

    const payload = {
      email: this.state.email,
      password: this.state.password
    }

    axios({
      url: '/profiles/login',
      method: 'POST',
      data: payload
    }).then((res)=>{
      console.log('Login successfull!!')
      localStorage.setItem('authToken', res.data.token)
      this.props.history.push('/')
      this.resetUserInputs()
    }).catch(()=>{
      console.log("Error");
      this.setState({error:true})
    })

  }

  resetUserInputs = () => {
    this.setState({
      email: '',
      password: ''
    })
  }

  render(){
    return(
        <form className="Login" onSubmit={this.submit}>
          <h1 className="m-heading">Login</h1>
          {this.state.error?<p className="Login-Error">Emain Or Password Incorrect</p>:null}
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            placeholder="Enter Email"
            value={this.state.email}
            name="email" 
            id="name"
            onChange={this.handleChange}/>
          <label htmlFor="pass">Password</label>
          <input 
            type="password" 
            placeholder="Enter Password" 
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