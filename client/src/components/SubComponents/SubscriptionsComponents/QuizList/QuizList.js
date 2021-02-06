import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSubscriptionQuizes , setStartQuizModal } from "../../../../actions/index"
import "./QuizList.scss"
import { CircularProgress } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import QuizBeginPopup from '../QuizBeginPopup/QuizBeginPopup';

class QuizList extends Component {

  componentDidMount(){
    this.props.getSubscriptionQuizes(this.props.courseId)
  }

  componentWillUnmount(){
    this.props.setStartQuizModal(false);
  }

  handleQuiz = (quizNumber,isAttempted) => {
    const { setStartQuizModal } = this.props;

    setStartQuizModal(true,quizNumber,isAttempted);
  }

  render() {
    const { quizesLoading , quizList , courseId } = this.props;

    return (
      <div className="studentquiz">
        <h1 className="studentquiz--head">Quizes</h1>
        { 
          quizesLoading ? <div className = "studentquiz--loading" ><CircularProgress size={175}/></div> :
          (quizList.length === 0 ? 
          <p className="studentquiz--empty">No Quizes for this course.</p>
            :
          <div className="studentquiz--list">
            {quizList.map( quiz => <li className="studentquiz--list--item" key={quiz.quiz.quizNumber} onClick={() => this.handleQuiz(quiz.quiz.quizNumber,Boolean(quiz.score))}><span className = "studentquiz--list--item--title">{quiz.quiz.topic}</span><p className = "studentquiz--list--item--time" ><AccessAlarmIcon/>{quiz.quiz.totalTime} Minutes</p></li>)}
          </div>)
        }
        <QuizBeginPopup courseId={courseId}/>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    quizesLoading : state.student.quizesLoading,
    quizList : state.student.quizList
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    getSubscriptionQuizes : (courseId) => dispatch(getSubscriptionQuizes(courseId)),
    setStartQuizModal : (status,quizNumber,isAttempted) => dispatch(setStartQuizModal( status,quizNumber,isAttempted))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(QuizList);