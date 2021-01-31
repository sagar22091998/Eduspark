import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSubscriptionQuizes } from "../../../../actions/index"
import "./QuizList.scss"
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

class QuizList extends Component {

  componentDidMount(){
    this.props.getSubscriptionQuizes(this.props.courseId)
  }

  render() {
    const { quizesLoading , quizList } = this.props;

    return (
      <div className="studentquiz">
        <h1 className="studentquiz--head">Quizes</h1>
        { 
          quizesLoading ? <div className = "studentquiz--loading" ><CircularProgress size={175}/></div> :
          (quizList.length === 0 ? 
          <p className="studentquiz--empty">No Quizes for this course.</p>
            :
          <div className="studentquiz--list">
            {quizList.map( quiz => <Link key={quiz.quiz.quizNumber}><span>{quiz.quiz.topic}</span><p><AccessAlarmIcon/>{quiz.quiz.totalTime}</p></Link>)}
          </div>)
        }
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
    getSubscriptionQuizes : (courseId) => dispatch(getSubscriptionQuizes(courseId))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(QuizList);