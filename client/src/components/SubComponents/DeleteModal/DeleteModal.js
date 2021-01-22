import React, { Component } from 'react'
import { connect } from "react-redux"
import { setPopup , setDeleteModal , deleteCourse , deleteVideo , deleteQuiz , deleteQuestion } from "../../../actions/index"

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
    background: "#fff",
    position:"relative",
    border : "2px solid #1761a0",
    width : "300px",
    padding :"0.5rem"
  },
  main:{
    display : "flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
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
    fontSize:"1.5rem",
    margin:"0.5rem 0"
  },
  btncontainer:{
    display : "flex",
    justifyContent:"center",
    alignItems:"center"
  },
  btn:{
    padding:"0.5rem",
    background:"#1761a0",
    color: "#fff",
    margin:"0rem 0.25rem",
    transition:"0.4s",
    fontSize: "1.1rem",
    border:"1px solid #1761a0",
    
    "&:hover":{
      background:"#fff",
      color:"#000"
    }
  }
}

class DeleteModal extends Component {

  
  handleDelelte = () => {
    const { deleteVideo , deleteQuestion , deleteCourse , courseId , deleteType , deleteQuiz , quizNumber } = this.props;

    if(deleteType==="COURSE"){
      deleteCourse();
    } 
    else if(deleteType==="VIDEO"){
      deleteVideo(courseId)
    }
    else if(deleteType==="QUIZ"){
      deleteQuiz(courseId)
    }
    else if(deleteType==="QUESTION"){
      deleteQuestion({courseId,quizNumber})
    }

  }

  render(){
    const { deleteModal , setDeleteModal , deleteType } = this.props;
  
    const { modal , main , closeicon , text , head  , btncontainer , btn } = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ deleteModal }
        style={{zIndex:"1000"}}
        onClose={() => setDeleteModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}  
      >
        <Fade in={ deleteModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={() => setDeleteModal(false)}/>
            <div className={main}>
              <h1 className={head}>Are You Sure?</h1>
              <p className={text}>All the contents related to this <span>{deleteType}</span> will be removed</p>
              <div className={btncontainer}>
                <button className={btn} onClick={this.handleDelelte}>Yes</button>
                <button className={btn} onClick={() => setDeleteModal(false)}>No</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    deleteModal : state.courses.deleteModal,
    currentQuestion : state.quizdetails.currentQuestion,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
    deleteCourse : () => dispatch(deleteCourse()),
    deleteVideo : (courseId) => dispatch(deleteVideo(courseId)),
    deleteQuiz : (courseId) => dispatch(deleteQuiz(courseId)),
    deleteQuestion : (ids) => dispatch(deleteQuestion(ids)),
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(DeleteModal));