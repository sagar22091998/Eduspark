import React, { Component } from 'react';
import "./Showcase.css";

class Showcase extends Component{
  render(){
    return(
      <header className="Showcase">
        <div className="Showcase-container">
          <h1 className="l-heading text-primary">Welcome to EduSpark. </h1>
          <p className="Showcase-text m-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos 
              est minus, optio reiciendis distinctio inventore?
          </p>
        </div>
      </header>  
    );
  }
}




export default Showcase;