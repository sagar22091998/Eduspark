import React, { Component } from 'react';
import "./Grids.css"
import Grid from "./Grid"

class Grids extends Component{
  render(){
    return(
      <div className="Grids">
        <h2 className="l-heading my-2">Courses</h2>
        <div className="Grids-Container py-2">
          <Grid/>
          <Grid/>
          <Grid/>
          <Grid/>
          <Grid/>
          <Grid/>
          <Grid/>
          <Grid/>
        </div>
      </div>     
    );
  }
}

export default Grids;