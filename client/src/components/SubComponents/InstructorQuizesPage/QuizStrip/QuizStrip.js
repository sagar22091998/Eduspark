import React, { Component } from 'react';
import "./QuizStrip.scss";
import { connect } from "react-redux"
import { setDeleteModal , setSelectedQuiz , setEditQuizModal } from "../../../../actions/index"
import { Link } from "react-router-dom";

//Material UI
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'; 

class QuizStrip extends Component{
  
  handleDelete = () => {
    const { setSelectedQuiz , setDeleteModal , quizNumber } = this.props;
    
    setSelectedQuiz(quizNumber);
    setDeleteModal(true);
  }

  handleEdit = () => {
    const { setSelectedQuiz , setEditQuizModal , quizNumber , title , desc , time } = this.props;
    
    setSelectedQuiz(quizNumber);
    setEditQuizModal(true, {title,desc,time});
  }
  render(){
    const { title , desc , time , courseId , quizNumber } = this.props;

    return(
      <div className="quizstrip">
        <div className="quizstrip__head">
          <Link className="quizstrip__head--text" to={`/course/${courseId}/quizes/${quizNumber}`}>{title}</Link>
          <p className="quizstrip__head--icons">
            <EditIcon onClick={this.handleEdit} className="quizstrip__head--icons--edit"/> 
            <DeleteIcon onClick={this.handleDelete} className="quizstrip__head--icons--delete"/> 
          </p>
        </div>
        <div className="quizstrip__content">
          <div className="quizstrip__content--desc">{desc}</div>
          <div className="quizstrip__content--time">{time} Minutes</div>
        </div>
      </div> 
    );
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
    setEditQuizModal : (status,oldDetails) => dispatch(setEditQuizModal(status,oldDetails)),
    setSelectedQuiz : (id) => dispatch(setSelectedQuiz(id))
  }
}

export default connect( null , mapDispatchToProps )(QuizStrip);