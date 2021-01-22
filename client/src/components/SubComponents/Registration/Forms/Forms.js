import React, { Component } from 'react';
import "./Forms.scss"
import RegisterForm from "../RegisterForm/RegisterForm"
import LoginForm from '../LoginForm/LoginForm';
import { Route , Link , withRouter } from "react-router-dom";

class Forms extends Component{

  constructor(props){
    super(props);
    this.state={
      login: false
    };
    this.handleClick = this.handleClick.bind(this); 
  }
  
  componentDidMount(){
    const { history } = this.props;
    const formStatus = history.location.pathname.split("/")[2] === "login";
    this.setState({login:formStatus})

    this.formsSelector = history.listen((location) => {
      const formStatus = location.pathname.split("/")[2] === "login";
      this.setState({login:formStatus})
    });
  }
  
  componentWillUnmount(){
    this.formsSelector();
  }

  handleClick(e){
    this.setState( x =>{ 
         return({login : !(x.login)}); 
      });
    }
  
  render(){
    const { login } = this.state;

    return(
      <div className="forms">
        <div className={`forms__left ${login && "formVisible"}`}>
          <p>Already Registered?</p>
          <Link onClick={this.handleClick} className="forms__btn" to="/user/login">Log In</Link>
        </div>
        <div className="forms__middle">
          <Route exact path="/user/login" component={LoginForm} />  
          <Route exact path="/user/register" component={RegisterForm} /> 
        </div>
        <div className={`forms__right ${!login && "formVisible"}`}>
          <p>Not Registered?</p>
          <Link onClick={this.handleClick} className="forms__btn" 
          to="/user/register">Register Now!</ Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Forms);