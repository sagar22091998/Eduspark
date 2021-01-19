import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./CourseDetails.scss"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getAllVideos } from "../../../actions/index"
import UploadWidget from "../../SubComponents/UploadWidget/UploadWidget"
import VideoManager from '../../SubComponents/VideoManager/VideoManager';
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
            <VideoManager courseId ={match.params.courseID}/>
            <UploadWidget courseId ={match.params.courseID}/>
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