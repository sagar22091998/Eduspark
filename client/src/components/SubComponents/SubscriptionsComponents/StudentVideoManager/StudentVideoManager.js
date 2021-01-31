import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSubscriptionDetail , updateProgress , setStudentCurrentVideo , setUnlockNext } from "../../../../actions/index"
import "./StudentVideoManager.scss"
import { CircularProgress } from '@material-ui/core';
import ReactPlayer from "react-player";
import StudentVideoStrip from "../StudentVideoStrip/StudentVideoStrip"

class StudentVideoManager extends Component {

  componentDidMount(){
    this.props.getSubscriptionDetail(this.props.courseId)
  }

  handleUpdation = () => {
    const { currentVideo , updateProgress , lastCompletedVideo  , courseId  } = this.props;
    
    if(currentVideo.videoNumber===lastCompletedVideo){
      updateProgress(courseId)
    }
  }

  render() {
    const { videosLoading , currentVideo , subscriptionDetail , unlockNext , getSubscriptionDetail , courseId , lastCompletedVideo , setStudentCurrentVideo , setUnlockNext } = this.props;

    return (
      <div className="studentvideo">
        {videosLoading ? 
          <div className="studentvideo--loading"><CircularProgress size={175}/></div> :
          ( currentVideo===""?
            <div className="studentvideo--empty">No Videos added by instructor till now.</div>:
            <div className="studentvideo__main">
            <div className="studentvideo__main--wrapper">
              <ReactPlayer
                className="studentvideo__main--wrapper--player"
                url={currentVideo.publicId} 
                controls = {true}
                width='100%'
                height='100%'
                onProgress={(progress) =>{
                  if(progress.played > 0.85 && progress.played !==1 && unlockNext){
                    this.handleUpdation();
                  }
                }}
                onEnded = {() => setTimeout(()=>{
                  setUnlockNext(true)

                  if(currentVideo.videoNumber === lastCompletedVideo)
                    getSubscriptionDetail(courseId)
                  else
                    setStudentCurrentVideo(currentVideo.videoNumber+1)
                },2000)
              }
              />
            </div>
            <div className="studentvideo__main--list">
              {subscriptionDetail.videos.map((vid,index) => <StudentVideoStrip key={index} videoNumber={vid.videoNumber} publicId={vid.publicId} selectedVideo={vid.publicId===currentVideo.publicId} topic={vid.topic}/>)}
            </div>
          </div>
          )
        }
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    videosLoading : state.student.videosLoading,
    subscriptionDetail : state.student.subscriptionDetail,
    currentVideo : state.student.currentVideo,
    unlockNext : state.student.unlockNext,
    lastCompletedVideo : state.student.lastCompletedVideo,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    getSubscriptionDetail : (courseId) => dispatch(getSubscriptionDetail(courseId)),
    updateProgress : (courseId) => dispatch(updateProgress(courseId)),
    setUnlockNext : (status) => dispatch(setUnlockNext(status)),
    setStudentCurrentVideo : (videoNumber) => dispatch(setStudentCurrentVideo(videoNumber))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(StudentVideoManager);