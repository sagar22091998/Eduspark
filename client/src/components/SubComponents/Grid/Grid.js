import React, { Component } from 'react';
import "./Grid.scss"

class Grid extends Component{
  render(){
    return(
      <div className="grid">
        <div className="grid__front">
          <div className="grid__front--overlay">
            <h3>{this.props.name}</h3>
            <p>Tap for More</p>
          </div>
        </div>
        <div className="grid__back">
          <div className="grid__back--content">
            <p>{this.props.desc}</p>
            <button>Read More!!</button>
          </div>
        </div>
      </div>    
    );
  }
}

export default Grid;