import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentVideo , setDeleteModal , setEditTitleModal , changeOrder } from "../../../../actions/index";
import  "./VideoListItem.scss";

//Material UI
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { returnToTop } from '../../../../utils/utilityFunctions';

class VideoListItem extends Component {


  handleVideo = () => {
    const { setCurrentVideo , publicId } = this.props;
    setCurrentVideo(publicId);
    returnToTop();
  }
  
  handleDelete = (e) => {
    const { setDeleteModal , publicId } = this.props;
    
    setCurrentVideo(publicId);
    setDeleteModal(true);
    e.stopPropagation();
  }

  handleEdit = (e) => {
    const { setCurrentVideo , setEditTitleModal , publicId , videoTitle } = this.props;
    
    setCurrentVideo(publicId);
    setEditTitleModal(true, videoTitle);
    e.stopPropagation();
  }

  handleOrderUp = (e) => {
    const { changeOrder , courseId , publicId , setCurrentVideo } = this.props;
    setCurrentVideo(publicId);
    changeOrder("UP",courseId);
    e.stopPropagation();
  }

  handleOrderDown = (e) => {
    const { changeOrder , courseId , publicId , setCurrentVideo } = this.props;
    setCurrentVideo(publicId);
    changeOrder("DOWN",courseId);
    e.stopPropagation();
  }

  render(){
    const { videoTitle , videoNumber , lastItem , selectedVideo } = this.props;
  
    return (
      <div className={selectedVideo ? "videoitem selectedVideo" : "videoitem" } onClick={this.handleVideo}>
        <p className="videoitem__title">{videoTitle}</p>
        <div className="videoitem__update">
          <div></div><EditIcon onClick={this.handleEdit} className="videoitem__update--edit"/> 
          <DeleteIcon onClick={this.handleDelete} className="videoitem__update--delete"/>
          <div className="videoitem__update--order">
            {String(videoNumber) !== "1" ? <ArrowDropUpIcon className = "videoitem__update--order--up" onClick={this.handleOrderUp}/> : <ArrowDropUpIcon className = "videoitem__update--order--disabled"/>}
            {!lastItem ? <ArrowDropDownIcon className = "videoitem__update--order--down" onClick={this.handleOrderDown}/> : <ArrowDropDownIcon className = "videoitem__update--order--disabled"/>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {

  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {

    setCurrentVideo : (publicId) => dispatch(setCurrentVideo(publicId)),
    setEditTitleModal : (status,oldTitle) => dispatch(setEditTitleModal(status,oldTitle)),
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
    changeOrder : (orderType,courseId) => dispatch(changeOrder(orderType,courseId))
  }
}

export default connect(mapStatesToProps, mapDispatchToProps)(VideoListItem)
