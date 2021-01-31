import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPopup , setStudentCurrentVideo } from "../../../../actions/index";
import  "./StudentVideoStrip.scss";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

//Material UI

class StudentVideoStrip extends Component {


  handleVideo = () => {
    const { setPopup , publicId , setStudentCurrentVideo , videoNumber} = this.props;

    if(!publicId){
      setPopup(true,"Watch Previous Videos First","warning")
      return;
    }

    setStudentCurrentVideo(videoNumber)
  }
  

  render(){
    const { topic , publicId , selectedVideo } = this.props;
    
    let className = "studentvideoitem "

    if(selectedVideo)
      className += "selectedStudentVideo"
    else if(!publicId)
      className += "lockedVideo"
    
    return (
      <div className={className} onClick={this.handleVideo}><PlayCircleOutlineIcon/>{topic}</div>
    )
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setStudentCurrentVideo : (videoNumber) => dispatch(setStudentCurrentVideo(videoNumber)),
    // setDeleteModal : (status) => dispatch(setDeleteModal(status)),
    // changeOrder : (orderType,courseId) => dispatch(changeOrder(orderType,courseId))
  }
}

export default connect(null, mapDispatchToProps)(StudentVideoStrip)
