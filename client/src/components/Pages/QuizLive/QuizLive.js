import React, { Component , Fragment } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./QuizLive.scss"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { startAttempt , setSelectedOptions , submitAttempt } from "../../../actions/index"
import CircularProgress from '@material-ui/core/CircularProgress';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Countdown from 'react-countdown';

class QuizLive extends Component {

  componentDidMount() {
    const { courseID , quizNumber } = this.props.match.params
    returnToTop();
    
    this.props.startAttempt(courseID , quizNumber);
  }
  
  // durationConverter = (duration) => {
  //   const minutes = Math.floor(duration)
  //   const seconds = (duration - minutes)*60;
    
  //   return `${minutes} Mins ${Math.round(seconds)} Secs`;
  // }
  
  handleChange = (e) => {
    const { setSelectedOptions } = this.props;
    let { selectedOptions  } = this.props;

    
    const isAlready = selectedOptions.findIndex( item => Number(item.questionNumber) === Number(e.target.name) );

    if(isAlready!==-1)
      selectedOptions[isAlready].option = Number(e.target.value);
    else {
      selectedOptions.push({
        questionNumber:Number(e.target.name),
        option:Number(e.target.value)
      })
    }
  
    setSelectedOptions(selectedOptions);
  }

  handleSubmition = () => {
    const { submitAttempt , match , selectedOptions , history } = this.props;
    const { courseID , quizNumber } = match.params;

    submitAttempt(courseID,quizNumber,selectedOptions,history);
  }

  render() {
    const { quizAttemptDetail , quizDetailLoading } = this.props;

    return (
      <div className="quizlive">
        <div className="quizlive__overlay">
          {quizDetailLoading ?
          <div className="quizlive__loading"><CircularProgress size={200}/></div> :
          <Fragment>
            {console.log()}
            <div className="quizlive__countdown">
              <Countdown onComplete={this.handleSubmition} date={Date.now() + (quizAttemptDetail.timeLeft*60*1000) - 8000}/>
            </div>
            <div className="quizlive__details">
              <h1 className="quizlive__details--head">{quizAttemptDetail.quiz.topic}</h1>
              <div className="quizlive__details--other">
                <p className="quizlive__details--other--desc">{quizAttemptDetail.quiz.description}</p>
                <p className="quizlive__details--other--time"><AccessAlarmsIcon/>{quizAttemptDetail.quiz.totalTime} Minutes</p>
              </div>
              <div className="quizlive__details--instructions">
                <p><WbIncandescentIcon/>Complete the quiz in given time.</p>
                <p><WbIncandescentIcon/>All questions are single choice MCQs.</p>
                <p><WbIncandescentIcon/>Press submit to complete your submission.</p>
                <p><WbIncandescentIcon/>If time limit is reached only the  selected responses will be subbmited.</p>
              </div>
            </div>    
            {quizAttemptDetail.questions.length !==0 ? 
                quizAttemptDetail.questions.map(ques => 
                <div key={ques.questionNumber
                } className="quizlive__question">
                  <p className="quizlive__question--ques">{ques.question}</p>
                  <RadioGroup name = {String(ques.questionNumber)}  onChange={this.handleChange}>
                    <FormControlLabel className="quizlive__question--option" value="1" control={<Radio color="primary" />} label={ques.option1} />
                    <FormControlLabel className="quizlive__question--option" value="2" control={<Radio color="primary" />} label={ques.option2} />
                    <FormControlLabel className="quizlive__question--option" value="3" control={<Radio color="primary" />} label={ques.option3} />
                    <FormControlLabel className="quizlive__question--option" value="4" control={<Radio color="primary" />} label={ques.option4} />
                  </RadioGroup>
                </div>) :
              <p >Quiz Construction In Progress</p>
              })
              <button className="quizlive__submit" onClick={this.handleSubmition}>Submit Responses</button>
          </Fragment>
          }
        </div>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    quizDetailLoading : state.student.quizDetailLoading,
    quizAttemptDetail : state.student.quizAttemptDetail,
    selectedOptions : state.student.selectedOptions
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    startAttempt : (courseId,quizNumber) => dispatch(startAttempt(courseId,quizNumber)) ,
    submitAttempt : (courseId,quizNumber,finalOptions,history) => dispatch(submitAttempt(courseId,quizNumber,finalOptions,history)) ,
    setSelectedOptions : (selectedOptions) => dispatch(setSelectedOptions(selectedOptions)),
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(withRouter(QuizLive));