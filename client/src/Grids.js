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
        console.log(this.state.courses)
      })
    }

    render(){
  
      let clist = [  
        {name : "name-1", desc : "desc-1"} ,
        {name : "name-2" , desc : "desc-2"} ,
        {name : "name-3" , desc : "desc-3"} ,
        {name : "name-4" , desc : "desc-4"} ,
        {name : "name-5" , desc : "desc-5"} ,
        {name : "name-6" , desc : "desc-6"} ,
        {name : "name-7" , desc : "desc-7"} ,
        {name : "name-8" , desc : "desc-8"} 
      ]  ;   
  
      return(
      <div className="Grids">
        <h2 className="m-heading my-2">Courses</h2>
        <div className="Grids-Container py-2">

          {clist.map( (x)=> <Grid name={x.name} desc={x.desc} /> )}
        </div>
      </div>     
    );
  }
}

export default Grids;