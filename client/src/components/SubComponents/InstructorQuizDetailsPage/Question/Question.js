import React, { Component } from 'react'
import { connect } from "react-redux"
import { setDeleteModal , setCurrentQuestion , setEditQuestionModal } from "../../../../actions/index"
import "./Question.scss"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit'; 
import DeleteIcon from '@material-ui/icons/Delete';



class Question extends Component {
  
  handleDelete = () => {
    const { setCurrentQuestion , setDeleteModal , questionNumber } = this.props;
    
    setCurrentQuestion(questionNumber);
    setDeleteModal(true);
  }

  handleEdit = () => {
    const { setCurrentQuestion , setEditQuestionModal , questionNumber , options , question , correctAnswer } = this.props;
    
    setCurrentQuestion(questionNumber);
    setEditQuestionModal(true,{ options , question , correctAnswer });
  }

  render() {

    const { options , question , correctAnswer } = this.props;

    return (
      <div className="question">
        <div className="question__main">
          <div className="question__main--text">{question}</div>
          <div className="question__main--icon">
            <EditIcon onClick={this.handleEdit} className="question__main--icon--edit"/>
            <DeleteIcon onClick={this.handleDelete} className="question__main--icon--delete"/>
          </div>
        </div>
        <div className="question__options">
          {options.map( (option,index) => {
            return(<p key = {index} className = "question__options--option"><span>{option} </span> {index + 1 === correctAnswer ? <CheckCircleIcon className = "question__options--option--correct"/> : <CancelIcon className = "question__options--option--wrong"/>}</p>)})}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
    setEditQuestionModal : (status,editDetails={}) => dispatch( setEditQuestionModal(status,editDetails)),
    setCurrentQuestion : (currentQuestion) => dispatch(setCurrentQuestion(currentQuestion)),
  }
}

export default connect( null , mapDispatchToProps )(Question);