import React from 'react';
import {Route} from "react-router-dom";
import Home from "./Home";
import Register from "./Register"
import Nav from "./Nav"
import About from "./About"
import './App.css';


function App() {

  return (
    <div className="App">
      <Nav/>
      <Route exact path="/" component={Home} />
      <Route  path="/register" component={Register} />
      <Route  path="/about" component={About} />
    </div>
  );
}

export default App;
