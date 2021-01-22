import React, { Component } from 'react';
import "./Showcase.scss";

class Showcase extends Component{
  render(){
    return(
      <div className="showcase">
        <div className="showcase__container">
          <h1 className="showcase__container--head">Welcome to EduSpark. </h1>
          <p className="showcase__container--text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos est minus, optio reiciendis distinctio inventore?
          </p>
        </div>
      </div>  
    );
  }
}

export default Showcase;