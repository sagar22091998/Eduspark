import React, { Component } from 'react';
import "./CoursesGrids.scss"
import Grid from "../Grid/Grid"
import { connect } from "react-redux"
import { getAllCoursesList } from "../../../../actions/index"
import { CircularProgress } from '@material-ui/core';

class CoursesGrids extends Component{

    componentDidMount(){
      // this.props.getAllCoursesList();
    }

    render(){
      const { allCourses } = this.props;

      return(
      <div className="showcasecourse">
        <h2 className="showcasecourse--head">Courses</h2>
        { allCourses === "Empty" ?  
          <div className = "showcasecourse--loading ">
            <CircularProgress size={150}/>
          </div> 
          : ( allCourses.length !== 0 ? 
            <div className="showcasecourse--grids">
              {allCourses.map((course,index) => <Grid key={index} courseDetails={course}/>)}
            </div> :
            <div className="showcasecourse--empty">No Courses Available</div>            
            )
        }


      </div>     
    );
  }
}

const mapStatesToProps = (state) => { 
  return {
    allCourses : state.common.allCourses
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    getAllCoursesList : () => dispatch(getAllCoursesList())
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(CoursesGrids);