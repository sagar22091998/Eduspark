import React, { Component } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { toggleVideoQuiz , getSubscriptionsList } from "../../../actions/index"
import { returnToTop } from '../../../utils/utilityFunctions'
import QuizList from '../../SubComponents/SubscriptionsComponents/QuizList/QuizList'
import StudentVideoManager from '../../SubComponents/SubscriptionsComponents/StudentVideoManager/StudentVideoManager'
import "./SubscriptionDetails.scss"

class SubscriptionDetails extends Component {

  componentDidMount(){
    returnToTop();
    this.props.getSubscriptionsList();
  }

  componentWillUnmount(){
    this.props.toggleVideoQuiz(true);
  }

  render() {
    const { isVideoPlayer , toggleVideoQuiz , subscriptionsList , subscriptionsLoading } = this.props

    let title = "...";
    if(!subscriptionsLoading){
      const titleData =  subscriptionsList.find(sub => sub.courseId._id === this.props.match.params.courseID)
      title = titleData.courseId.name;
    }

    return (
      <div className="subsdetail">
        <div className="subsdetail__overlay">
          <h2 className="subsdetail__heading">{title}</h2>
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
    isVideoPlayer : state.student.isVideoPlayer,
    subscriptionsList : state.student.subscriptionsList,
    subscriptionsLoading : state.student.subscriptionsLoading
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    toggleVideoQuiz : (status) => dispatch(toggleVideoQuiz(status)),
    getSubscriptionsList : () => dispatch(getSubscriptionsList())
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(withRouter(SubscriptionDetails));