import React, { Component } from 'react';
import "./Grid.css"

class Grid extends Component{


  render(){
    return(

      <div className="Grid">
        <div className="Grid-Main">
          <div className="Grid-Front p-1">
            <h3>{this.props.name}</h3>
            <p>{this.props.desc}</p>
          </div>
          <div className="Grid-Back ">
            <div className="Grid-Back-Content p-1">
              <h3>Lorem ipsum dolor sit amet</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt veniam mollitia iste libero, tempora adipisci maxime officiis aliquid doloribus cumque?</p>
            </div>
            <button>asdsad</button>
          </div>
        </div>
      </div>    
    );
  }
}

export default Grid;