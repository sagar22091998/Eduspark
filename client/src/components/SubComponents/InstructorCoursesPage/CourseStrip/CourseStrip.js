import React, { Component } from 'react';
import "./CourseStrip.scss";
import { connect } from "react-redux"
import { setDeleteModal , setSelectedCourse , setEditModal } from "../../../../actions/index"
import { Link } from "react-router-dom";

//Material UI
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'; 

class CourseStrip extends Component{
  
  handleDelete = () => {
    const { setSelectedCourse , setDeleteModal , courseId } = this.props;
    
    setSelectedCourse(courseId);
    setDeleteModal(true);
  }

  handleEdit = () => {
    const { setSelectedCourse , setEditModal , courseId , title , desc , price } = this.props;
    
    setSelectedCourse(courseId);
    setEditModal(true, {title,desc,price});
  }
  render(){
    const { title , desc , price , courseId } = this.props;

    return(
      <div className="strip">
        <div className="strip__head">
          <Link className="strip__head--text" to={`/course/${courseId}`}>{title}</Link>
          <p className="strip__head--icons">
            <EditIcon onClick={this.handleEdit} className="strip__head--icons--edit"/> 
            <DeleteIcon onClick={this.handleDelete} className="strip__head--icons--delete"/> 
          </p>
        </div>
        <div className="strip__content">
          <div className="strip__content--desc">{desc}</div>
          <div className="strip__content--price">₹{price}.00</div>
        </div>
      </div> 
    );
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
    setEditModal : (status,oldDetails) => dispatch(setEditModal(status,oldDetails)),
    setSelectedCourse : (id) => dispatch(setSelectedCourse(id))
  }
}

export default connect( null , mapDispatchToProps )(CourseStrip);