import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./CourseDetails.scss"
import { connect } from "react-redux"
import { withRouter , Link } from "react-router-dom"
import { getAllVideos } from "../../../actions/index"
import UploadWidget from "../../SubComponents/InstructorCoursesDetails/UploadWidget/UploadWidget"
import VideoManager from '../../SubComponents/InstructorCoursesDetails/VideoManager/VideoManager';
import { Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';

class CourseDetails extends Component {

  componentDidMount() {
    const { getAllVideos , match } = this.props;
    
    returnToTop();
    getAllVideos(match.params.courseID);
  }

  render() {
    const { videosLoading , match , name , description , price , studentEnrolled } = this.props;

    const courseId = match.params.courseID;

    return (
      <div className="courseinfo">
        <div className="courseinfo__overlay">
          {videosLoading ?
          <div className="courseinfo__loading"><CircularProgress size={200}/></div> :
          <Fragment>
            <div className="courseinfo__details">
              <h1 className="courseinfo__details--head">{name}</h1>
              <p className="courseinfo__details--desc">{description}</p>
              <div className="courseinfo__details--other">
                <p>Price : ₹{price}</p>
                <p>Student Enrolled : {studentEnrolled}</p>
              </div>
            </div>
            <VideoManager courseId ={courseId}/>
            <UploadWidget courseId ={courseId}/>
            <Link className="courseinfo__quiz" to={`/course/${courseId}/quizes`}>Add Quizes For This Course</Link>
          </Fragment>
          }
        </div>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    videosLoading : state.details.videosLoading,
    name : state.details.name,
    description : state.details.description,
    price : state.details.price,
    studentEnrolled : state.details.studentEnrolled
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    getAllVideos : (id) => dispatch(getAllVideos(id))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(withRouter(CourseDetails));