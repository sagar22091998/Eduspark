import React, { Component } from 'react';
import "./CoursesGrids.scss"
import Grid from "../../SubComponents/Grid/Grid"

class CoursesGrids extends Component{

    render(){
      return(
      <div className="showcasecourse">
        <h2 className="showcasecourse--head">Courses</h2>
        <div className="showcasecourse--grids">
          <Grid name={"Name.JS"} desc={"Description.JS"}/>
          <Grid name={"Name.JS"} desc={"Description.JS"}/>
          <Grid name={"Name.JS"} desc={"Description.JS"}/>
          <Grid name={"Name.JS"} desc={"Description.JS"}/>
        </div>
        <button className="showcasecourse--btn">View More</button>
      </div>     
    );
  }
}

export default CoursesGrids;