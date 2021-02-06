import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./QuizLeaderboard.scss"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getQuizLeaderboard } from "../../../actions/index"
import CircularProgress from '@material-ui/core/CircularProgress';

class QuizLeaderboard extends Component {

  componentDidMount() {
    const { courseID , quizNumber } = this.props.match.params
    returnToTop();
    
    this.props.getQuizLeaderboard(courseID , quizNumber);
  }
  
  durationConverter = (duration) => {
    const minutes = Math.floor(duration)
    const seconds = (duration - minutes)*60;
    
    return `${minutes} Mins ${Math.round(seconds)} Secs`;
  }
  

  render() {
    const { leaderboard , leaderboardLoading } = this.props;
    const { quizNumber } = this.props.match.params

    return (
      <div className="leaderboard">
        <div className="leaderboard--overlay">
          <h1 className="leaderboard--head">Quiz {quizNumber} Leaderboard</h1>
          { 
            leaderboardLoading ? <div className = "leaderboard--loading" ><CircularProgress size={175}/></div> :
            <div className="leaderboard--list">
              <div className="leaderboard--list--itemfirst">
                <p>Name</p>
                <p>Score</p>
                <p>Time To Complete</p>
              </div>
              {leaderboard.map(item => <div className="leaderboard--list--item">
                <p>{item.studentId.name}</p>
                <p>{item.score}</p>
                <p>{this.durationConverter(item.duration)}</p>
              </div>)}
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    leaderboard : state.student.leaderboard,
    leaderboardLoading : state.student.leaderboardLoading
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    getQuizLeaderboard : (courseId,quizNumber) => dispatch(getQuizLeaderboard(courseId,quizNumber)) 
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(withRouter(QuizLeaderboard));