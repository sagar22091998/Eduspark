import React, { Component } from 'react';
import {Route} from "react-router-dom";
import Home from "./Home";
import Register from "./Register"
import About from "./About"
import Courses from "./Courses"
import './App.css';


class App extends Component {

  render(){

      return (
        <div className="App">
        <Route exact path="/" component={Home} />
        <Route  path="/register" component={ Register}/> 
        <Route exact path="/about" component={About} />
        <Route  path="/courses" component={Courses} />
      </div>
      );
  }
}

export default App;
