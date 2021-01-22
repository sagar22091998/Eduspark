import React, { Component } from 'react'
import { connect } from "react-redux"
import { setPopup , setQuizAddModal , setQuizesFields , addNewQuiz } from "../../../../actions/index"

import { isEmpty } from "../../../../utils/validators"
import MessagePopup from "../../MessagePopup/MessagePopup"

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
    background: "#25292e",
    borderRadius :"10px",
    position:"relative",
    border : "4px solid #fff",
    width : "500px", 
    "@media(max-width:550px)":{
      margin : "150px auto 0 auto",
      width : "300px"
    }
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
    color:"#fff",  
    borderRadius:"50%",
    cursor:"pointer",
    border : "1px solid #fff"
  },
  head:{
    fontFamily: "'Kaushan Script', cursive",
    textShadow: "2px 2px #1761a0",
    color:"#fff",  
    fontSize:"2.5rem",
    margin:"1rem 0",    
    "@media(max-width:550px)":{
      textShadow: "0px 0px",  
      fontSize:"1.25rem",
    }
  },
  fields:{
    fontSize:"1.1rem",
    width : "100%",
    color:"#fff",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding : "1rem 2rem",
    borderTop:"4px solid #fff",

    "& input,& textarea,& select":{
      borderRadius:"5px",
      padding:"0.5rem",
      width:"200px",
      border :"1px solid #000",
      fontSize:"1.1rem"
    },
    "& textarea":{
      resize:"none",
      height:"150px"
    },
    "@media(max-width:550px)":{
      fontSize:"0.85rem",
      padding : "1rem",

      "& input,& textarea,& select":{
        padding:"0.5rem",
        fontSize:"0.85rem",
        width:"125px"
      }
    }
  },
  fieldBorder:{
    borderBottom:"4px solid #fff"
  },
  btn:{
    padding:"0.75rem",
    background:"#1761a0",
    color: "#fff",
    transition:"0.4s",  
    margin: "1rem 0",
    fontSize: "1.1rem",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    
    "&:hover":{
      background:"#fff",
      color:"#000"
    },

    "@media(max-width:550px)":{
      padding:"0.5rem",  
      margin: "1rem 0",
      fontSize: "0.85rem"
    }
  }
}

class AddQuiz extends Component {
  
  handleQuizFields = (e) =>{
    this.props.setQuizesFields(e.target.name,e.target.value)
  }

  handleClose = () => {
    const { setQuizAddModal , setQuizesFields } = this.props;
    
    setQuizesFields("quizName","")
    setQuizesFields("quizTime","")
    setQuizesFields("quizDescription","")
    setQuizAddModal(false)
  }

  handleAddition = () => {  
    const { quizName , quizTime , quizDescription , setPopup , addNewQuiz , courseId } = this.props;

    if(isEmpty({ quizName , quizTime , quizDescription })){
      setPopup(true,"Enter all fields","error")
      return;
    }  

    addNewQuiz(courseId,{quizName , quizTime , quizDescription});
  }


  render(){
    const { addQuizModal , quizName , quizTime , quizDescription } = this.props;
  
    const { modal , main , closeicon , head , fields , btn , fieldBorder } = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ addQuizModal }
        style={{zIndex:"1000"}}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}  
      >
        <Fade in={ addQuizModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={this.handleClose}/>
            <div className={main}>
              <h1 className={head}>New Quiz</h1>
              <div className={fields}>
                <label htmlFor="quizName">Quiz Title</label>
                <input value={quizName} type="text" name="quizName" onChange={this.handleQuizFields} id="quizName" />
              </div>
              <div className={fields}>
                <label htmlFor="quizTime">Time (in Minutes)</label>
                <select name="quizTime" onChange={this.handleQuizFields} id="quizTime" defaultValue={ quizTime !== "" ? quizTime: "default"}>
                  <option value="default" hidden disabled > Select Time </option>
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>
              <div className={`${fields} , ${fieldBorder}`}>
                <label htmlFor="quizDescription">Quiz Description</label>
                <textarea value={quizDescription} name="quizDescription" onChange={this.handleQuizFields} id="quizDescription" />
              </div>
              <button className={btn} onClick={this.handleAddition}>Add Quiz!</button>
            </div>
            <MessagePopup/>
          </div>
        </Fade>
      </Modal>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    quizName : state.quizes.quizName,
    quizDescription : state.quizes.quizDescription,
    quizTime : state.quizes.quizTime,
    addQuizModal : state.quizes.addQuizModal,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setQuizesFields : (name,value) => dispatch(setQuizesFields(name,value)),
    setQuizAddModal : (status) => dispatch(setQuizAddModal(status)),
    addNewQuiz : (courseId,quizDetails) => dispatch(addNewQuiz(courseId,quizDetails))
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(AddQuiz));