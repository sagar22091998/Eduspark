import React, { Component } from 'react';
import "./Grids.css"
import Grid from "./Grid"
import { getAllCourses } from './userFunctions'

class Grids extends Component{

    constructor(props){
      super(props)
      this.state={
        courses: [],
        MAX:true
      }
      this.handleChange = this.handleChange.bind(this); 
    }

    componentDidMount() {
      getAllCourses().then(res => {
        this.setState({
          courses: res
        })
      })
    }

    handleChange(){
      this.setState((x) => ({MAX : !x.MAX}));
    }

    render(){
      let maxGrid = this.state.MAX ? 8 : this.state.courses.length;
      return(
      <div className="Grids">
        <h2 className="m-heading my-2">Courses</h2>
        <div className="Grids-Container py-2">
          {
          this.state.courses.slice(0, maxGrid).map( (x)=> <Grid id={x._id} key={x._id} name={x.name} desc={x.description} /> )}
        </div>
        {this.state.MAX?<button className="btn my-1" onClick={this.handleChange}>View More</button>:<button className="btn my-1" onClick={this.handleChange}>View Less</button>}
      </div>     
    );
  }
}

export default Grids;