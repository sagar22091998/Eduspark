import React, { Component } from 'react';
import {Route,Switch} from "react-router-dom";
import Home from "./Home";
import Register from "./Register"
import About from "./About"
import Profiles from "./Profiles"
import './App.css';
import Courses from './Courses';
import Error404 from './Error404';


class App extends Component {

  render(){

      return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route  path="/register" component={ Register}/> 
            <Route  path="/about" component={About} />
            <Route  path="/profile" component={Profiles} />
            <Route  path="/course" component={Courses} />
            <Route  exact path='*'  component={Error404} />
          </Switch>
        </div>
      );
  }
}

export default App;
