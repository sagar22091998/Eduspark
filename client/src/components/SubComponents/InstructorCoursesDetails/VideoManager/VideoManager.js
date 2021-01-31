import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPopup , setEditTitleModal , setDeleteModal } from "../../../../actions/index"
import "./VideoManager.scss"
import { Fragment } from 'react'
import VideoListItem from '../VideoListitem/VideoListItem'
import DeleteModal from '../../DeleteModal/DeleteModal'
import EditTitle from '../EditTitle/EditTitle'
import ReactPlayer from 'react-player'

class VideoManager extends Component {

  componentWillUnmount(){
    const { setEditTitleModal , setDeleteModal } = this.props;
  
    setEditTitleModal(false);
    setDeleteModal(false);
  }

  render() {
    const { currentVideo , allVideosList , courseId } = this.props;

    return (
      <div className="videos">
        { allVideosList && allVideosList.length!==0 ?
          <Fragment>
            <div className="videos__player">
              <ReactPlayer
                className="videos__player--main"
                url={currentVideo} 
                controls = {true}
                width='100%'
                height='100%'
              />
            </div>
            <div className="videos__list">
              {allVideosList.map(item => <VideoListItem courseId = {courseId} key = {item.videoNumber} selectedVideo={currentVideo===item.publicId} videoNumber={item.videoNumber} videoTitle = {item.topic} publicId={item.publicId} lastItem={allVideosList.length===item.videoNumber}/> )}
            </div>
          </Fragment>
          : <div className="videos__empty">No videos added to this course. Add your videos now!</div>
        }
        <DeleteModal courseId={courseId} deleteType="VIDEO"/> 
        <EditTitle courseId={courseId}/>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    allVideosList : state.details.allVideosList,
    videosLoading : state.details.videosLoading,
    currentVideo : state.details.currentVideo,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setEditTitleModal : (status,oldTitle) => dispatch(setEditTitleModal(status,oldTitle)),
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
  }
}

export default connect(mapStatesToProps, mapDispatchToProps)(VideoManager)
