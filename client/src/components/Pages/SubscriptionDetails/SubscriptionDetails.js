import React, { Component } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { toggleVideoQuiz , getSubscriptionDetail } from "../../../actions/index"
import { returnToTop } from '../../../utils/utilityFunctions'
import QuizList from '../../SubComponents/SubscriptionsComponents/QuizList/QuizList'
import StudentVideoManager from '../../SubComponents/SubscriptionsComponents/StudentVideoManager/StudentVideoManager'
import "./SubscriptionDetails.scss"

class SubscriptionDetails extends Component {

  componentDidMount(){
    returnToTop();
  }

  render() {
    const { isVideoPlayer , toggleVideoQuiz } = this.props

    return (
      <div className="subsdetail">
        <div className="subsdetail__overlay">
          <h2 className="subsdetail__heading">TITLE</h2>
          <div className="subsdetail__buttons">
            <button onClick={()=>toggleVideoQuiz(true)}><span>VIDEOS</span></button>
            <button onClick={()=>toggleVideoQuiz(false)}><span>QUIZ</span></button>
          </div>
          { isVideoPlayer ? 
          <StudentVideoManager courseId={this.props.match.params.courseID}/> :
          <QuizList courseId={this.props.match.params.courseID}/>}
        </div>
      </div>
    )
  }
}
const mapStatesToProps = (state) => { 
  return {
    isVideoPlayer : state.student.isVideoPlayer
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    toggleVideoQuiz : (status) => dispatch(toggleVideoQuiz(status)),
    getSubscriptionDetail : (courseId) => dispatch(getSubscriptionDetail(courseId))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(withRouter(SubscriptionDetails));