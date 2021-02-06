import React, { Component , Fragment } from 'react'
import { connect } from "react-redux"
import { setPopup , setStartQuizModal } from "../../../../actions/index"
import { Link } from "react-router-dom";
//Material UI
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  modal: {
    margin : "300px auto 0 auto",
    outline:"none",
    background: "#000",
    position:"relative",
    border : "5px solid #1761a0",
    width : "300px",
    padding :"0.5rem",
    height:"200px",
    color:"#fff"
  },
  closeicon:{
    position:"absolute",
    right : "0.5rem",
    top : "0.5rem",
    cursor:"pointer"
  },
  text:{
    color:"red",
    padding:"0.5rem 1rem",
    textAlign:"center",

    "& span":{
      textTransform:"lowercase"
    }
  },
  head:{
    fontSize:"1.25rem",
    margin:"2rem auto",
    textAlign: "center"
  },
  btnLeader:{
    display:"block",
    padding:"0.5rem",
    background:"#1761a0",
    color: "#fff",
    margin:"2rem auto",
    transition:"0.4s",
    fontSize: "1.1rem",
    border:"1px solid #1761a0",
    maxWidth:"182px",
    
    "&:hover":{
      background:"#fff",
      color:"#000"
    }
  },
  btn:{
    display:"inline-block",
    padding:"0.5rem",
    background:"#1761a0",
    color: "#fff",
    margin:"1rem auto 3rem auto",
    textAlign:"center",
    minWidth:"100px",
    transition:"0.4s",
    fontSize: "1.1rem",
    border:"1px solid #1761a0",
    
    "&:hover":{
      background:"#fff",
      color:"#000"
    }
  },
  btncontainer:{
    display : "flex",
    justifyContent:"center",
    alignItems:"center"
  },
}

class QuizBeginPopup extends Component {

  render(){
    const { startQuizModal , setStartQuizModal , quizIsAttempted  , courseId , startQuizNumber } = this.props;
  
    const { modal , closeicon , head  , btn , btnLeader , btncontainer } = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ startQuizModal }
        style={{zIndex:"1000"}}
        onClose={() => setStartQuizModal(false,"",quizIsAttempted)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}  
      >
        <Fade in={ startQuizModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={() => setStartQuizModal(false,"",quizIsAttempted)}/>
            {quizIsAttempted ?
              <Fragment>
                <p className={head}>You've already attempted this quiz.</p>
                <Link to={`/subscription/${courseId}/leaderboards/${startQuizNumber}`} className={btnLeader}>Go To Leaderboards</Link>
              </Fragment> :
              <Fragment>
                <p className={head}>Attempt Quiz?</p>
                <div className={btncontainer}>
                <Link to={`/subscription/${courseId}/quizattempt/${startQuizNumber}`} className={btn}>Yes</Link>
                  <button className={btn} onClick={() => setStartQuizModal(false,"",quizIsAttempted)}>No</button>
                </div>
              </Fragment>
            }
          </div>
        </Fade>
      </Modal>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    startQuizModal : state.student.startQuizModal,
    startQuizNumber : state.student.startQuizNumber,
    quizIsAttempted : state.student.quizIsAttempted,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setStartQuizModal : (status,quizNumber,isAttempted) => dispatch(setStartQuizModal( status,quizNumber,isAttempted))
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(QuizBeginPopup));