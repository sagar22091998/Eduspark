import React, { Component } from 'react';
import "./Grids.css"
import Grid from "./Grid"
import { getAllCourses } from './userFunctions'

class Grids extends Component{

    constructor(props){
      super(props)
      this.state={
        courses: []
      }
    }

    componentDidMount() {
      getAllCourses().then(res => {
        this.setState({
          courses: res
        })
      })
    }

    render(){
  
      return(
      <div className="Grids">
        <h2 className="m-heading my-2">Courses</h2>
        <div className="Grids-Container py-2">
          {this.state.courses.map( (x)=> <Grid key={x._id} name={x.name} desc={x.description} /> )}
        </div>
      </div>     
    );
  }
}

export default Grids;