import React, { Component } from 'react'
import { connect } from "react-redux"
import { setPopup , setEditQuestionModal , setQuestionFields , updateQuestion  } from "../../../../actions/index"

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
    margin : "150px auto 0 auto",
    outline:"none",
    background: "#25292e",
    borderRadius :"10px",
    position:"relative",
    border : "4px solid #fff",
    width : "500px", 
    "@media(max-width:1600px)":{
      margin : "75px auto 0 auto",
    }
    // ,
    // "@media(max-width:550px)":{
    //   width : "300px"
    // }
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
    fontSize:"2.25rem",
    margin:"0.75rem 0",    
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
    padding : "0.65rem 2rem",
    borderTop:"4px solid #fff",

    "& input,& textarea ,& select":{
      borderRadius:"5px",
      padding:"0.45rem",
      width:"225px",
      border :"1px solid #000",
      fontSize:"1.1rem"
    },
    "& textarea":{
      resize:"none",
      height:"75px"
    },
    "@media(max-width:550px)":{
      fontSize:"0.85rem",
      padding : "1rem",

      "& input,& textarea ,& select":{
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
    padding:"0.65rem",
    background:"#1761a0",
    color: "#fff",
    transition:"0.4s",  
    margin: "0.75rem 0",
    fontSize: "1.1rem",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",

    "&:disabled":{
      cursor : "default",
      background: "#bbb",
      color: "#000"
    },

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

class EditQuestionModal extends Component {
  
  handleQuestionFields = (e) => {
    this.props.setQuestionFields(e.target.name,e.target.value)
  }

  handleUpdation = () => {  
    const { newQuestion , newOption1 , newOption2 , newOption3 , newOption4 , newCorrectAnswer , setPopup , updateQuestion , courseId , quizNumber } = this.props;

    if(isEmpty({ newQuestion , newOption1 , newOption2 , newOption3 , newOption4 , newCorrectAnswer })){
      setPopup(true,"Enter all fields","error")
      return;
    }  

    const questionDetails = { newQuestion , newOption1 , newOption2 , newOption3 , newOption4 , newCorrectAnswer }

    const ids = { courseId , quizNumber }

    updateQuestion(questionDetails,ids);
  }


  render(){
    const { editQuestionModal , newQuestion , newOption1 , newOption2 , newOption3 , newOption4 , newCorrectAnswer , oldQuestion , oldOption1 , oldOption2 , oldOption3 , oldOption4 , oldCorrectAnswer , setEditQuestionModal } = this.props;
  
    const { modal , main , closeicon , head , fields , btn , fieldBorder} = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ editQuestionModal }
        style={{zIndex:"1000"}}
        onClose={() => setEditQuestionModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}  
      >
        <Fade in={ editQuestionModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={() => setEditQuestionModal(false)}/>
            <div className={main}>
              <h1 className={head}>Edit Question</h1>
              <div className={fields}>
                <label htmlFor="newQuestion">Question</label>
                <textarea value={newQuestion} name="newQuestion" onChange={this.handleQuestionFields} id="newQuestion" />
              </div>
              <div className={fields}>
                <label htmlFor="newOption1">Option 1</label>
                <input value={newOption1} type="text" name="newOption1" onChange={this.handleQuestionFields} id="newOption1" />
              </div>
              <div className={fields}>
                <label htmlFor="newOption2">Option 2</label>
                <input value={newOption2} type="text" name="newOption2" onChange={this.handleQuestionFields} id="newOption2" />
              </div>
              <div className={fields}>
                <label htmlFor="newOption3">Option 3</label>
                <input value={newOption3} type="text" name="newOption3" onChange={this.handleQuestionFields} id="newOption3" />
              </div>
              <div className={fields}>
                <label htmlFor="newOption4">Option 4</label>
                <input value={newOption4} type="text" name="newOption4" onChange={this.handleQuestionFields} id="newOption4" />
              </div>
              <div className={`${fields} , ${fieldBorder}`}>
                <label htmlFor="newCorrectAnswer">Correct Answer</label>
                <select name="newCorrectAnswer" onChange={this.handleQuestionFields} id="newCorrectAnswer" defaultValue={ newCorrectAnswer !== "" ? newCorrectAnswer: "default"}>
                  <option value="default" hidden disabled > Select Option </option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>
                </select>
              </div>
              <button disabled={ oldQuestion === newQuestion && oldOption1 === newOption1 && oldOption2 === newOption2 && oldOption3 === newOption3 && oldOption4 === newOption4 && newCorrectAnswer === oldCorrectAnswer} className={btn} onClick={this.handleUpdation}>Update</button>
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
    editQuestionModal : state.quizdetails.editQuestionModal,
    newQuestion : state.quizdetails.newQuestion,
    newOption1 : state.quizdetails.newOption1,
    newOption2 : state.quizdetails.newOption2,
    newOption3 : state.quizdetails.newOption3,
    newOption4 : state.quizdetails.newOption4,
    newCorrectAnswer : state.quizdetails.newCorrectAnswer,
    oldQuestion : state.quizdetails.oldQuestion,
    oldOption1 : state.quizdetails.oldOption1,
    oldOption2 : state.quizdetails.oldOption2,
    oldOption3 : state.quizdetails.oldOption3,
    oldOption4 : state.quizdetails.oldOption4,
    oldCorrectAnswer : state.quizdetails.oldCorrectAnswer,
    currentQuestion : state.quizdetails.currentQuestion,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setQuestionFields : (name,value) => dispatch(setQuestionFields(name,value)),
    setEditQuestionModal : (status,editDetails) => dispatch(setEditQuestionModal(status,editDetails)),
    updateQuestion : (questionDetails,ids) => dispatch(updateQuestion(questionDetails,ids))
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(EditQuestionModal));