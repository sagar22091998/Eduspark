import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPopup } from "../../../actions/index"
import { Video , Transformation } from "cloudinary-react"
import "./VideoManager.scss"
import { Fragment } from 'react'
import VideoListItem from '../VideoListitem/VideoListItem'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditTitle from '../EditTitle/EditTitle'
import MediaQuery  from 'react-responsive'

class VideoManager extends Component {

  render() {
    const { currentVideo , allVideosList , courseId } = this.props;

    return (
      <div className="videos">
        { allVideosList && allVideosList.length!==0 ?
          <Fragment>
            <div className="videos__player">
                <Video 
                  key={currentVideo}
                  controls
                  cloudName={process.env.REACT_APP_CLOUDINARY_DATABASE}
                  publicId={currentVideo}
                >
                  <MediaQuery minWidth={769}>
                    <Transformation width="768" height="432" />
                  </MediaQuery>
                  <MediaQuery maxWidth={768} minWidth={551}>
                    <Transformation width="560" height="315" />
                  </MediaQuery>
                  <MediaQuery maxWidth={550}>
                    <Transformation width="256" height="144" />
                  </MediaQuery>
                </Video>
            </div>
            <div className="videos__list">
              {allVideosList.map(item => <VideoListItem courseId = {courseId} key = {item.videoNumber} selectedVideo={currentVideo===item.publicId} videoNumber={item.videoNumber} videoTitle = {item.topic} publicId={item.publicId} lastItem={allVideosList.length===item.videoNumber}/> )}
            </div>
          </Fragment>
          : <div className="videos__empty">No videos added to this course.Add your videos now!</div>
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
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType))
  }
}

export default connect(mapStatesToProps, mapDispatchToProps)(VideoManager)
