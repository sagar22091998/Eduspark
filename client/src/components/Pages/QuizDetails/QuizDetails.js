import React, { Component , Fragment } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./QuizDetails.scss"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getAllQuestions , setEditQuestionModal , setAddQuestionModal ,setDeleteModal } from "../../../actions/index"
import AddQuestionModal from '../../SubComponents/InstructorQuizDetailsPage/AddQuestionModal/AddQuestionModal';
import EditQuestionModal from '../../SubComponents/InstructorQuizDetailsPage/EditQuestionModal/EditQuestionModal';
import { CircularProgress } from '@material-ui/core';
import DeleteModal from '../../SubComponents/DeleteModal/DeleteModal';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import Question from '../../SubComponents/InstructorQuizDetailsPage/Question/Question';

class QuizDetails extends Component {

  componentDidMount() {
    const { getAllQuestions , match } = this.props;
    const { courseID , quizNumber } = match.params;

    returnToTop();
    getAllQuestions({courseId:courseID , quizNumber});
  }

  componentWillUnmount(){
    const { setEditQuestionModal , setAddQuestionModal , setDeleteModal } = this.props;
  
    setEditQuestionModal(false);
    setAddQuestionModal(false);
    setDeleteModal(false)
  }

  render() {
    const { questionsLoading , match , title , description , time , allQuestionsList , setAddQuestionModal } = this.props;

    const { courseID , quizNumber } = match.params;

    return (
      <div className="quizinfo">
        <div className="quizinfo__overlay">
          {questionsLoading ?
          <div className="quizinfo__loading"><CircularProgress size={200}/></div> :
          <Fragment>
            <div className="quizinfo__details">
              <h1 className="quizinfo__details--head">{title}</h1>
              <div className="quizinfo__details--other">
                <p className="quizinfo__details--other--desc">{description}</p>
                <p className="quizinfo__details--other--time"><AccessAlarmsIcon/>{time} Minutes</p>
              </div>
            </div>
            <button onClick={() => setAddQuestionModal(true)} className="quizinfo__add">{ allQuestionsList.length !==0 ? "Add Another Question" : "Add Question" }</button>
            {allQuestionsList.length !==0 ? 
              <div className="quizinfo__list">
                {allQuestionsList.map(ques => <Question key = {ques.questionNumber} correctAnswer={ques.correctAnswer} options={[ques.option1,ques.option2,ques.option3,ques.option4]} question={ques.question} questionNumber={ques.questionNumber}/>)}
              </div> :
              <p className="quizinfo__empty">No Questions Added</p>
            }
            <AddQuestionModal courseId = {courseID} quizNumber={quizNumber}/>
            <EditQuestionModal courseId = {courseID} quizNumber={quizNumber}/>
            <DeleteModal deleteType="QUESTION" courseId = {courseID} quizNumber={quizNumber}/>
          </Fragment>
          }
        </div>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    questionsLoading : state.quizdetails.questionsLoading,
    title : state.quizdetails.title,
    description : state.quizdetails.description,
    time : state.quizdetails.time,
    allQuestionsList : state.quizdetails.allQuestionsList,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    getAllQuestions : (ids) => dispatch(getAllQuestions(ids)),
    setEditQuestionModal : (status,editDetails) => dispatch(setEditQuestionModal(status,editDetails)),
    setAddQuestionModal : (status) => dispatch(setAddQuestionModal(status)),
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(withRouter(QuizDetails));