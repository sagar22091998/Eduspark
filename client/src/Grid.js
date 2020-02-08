import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Grid.css"

class Grid extends Component{


  render(){
    return(

      <div className="Grid">
        <div className="Grid-Main">
          <div className="Grid-Front">
            <div className="Grid-Overlay">
              <h3 className="s-heading">{this.props.name}</h3>
            </div>
          </div>
          <div className="Grid-Back ">
            <div className="Grid-Back-Content">
              <p>{this.props.desc}</p>
              <Link state className="btn-dark" to={{
                pathname:`/course/${this.props.id}`,
                state:{
                  name : this.props.name,
                  desc : this.props.desc
                }
                
              }} >Read More!!</Link >
            </div>
          </div>
        </div>
      </div>    
    );
  }
}

export default Grid;