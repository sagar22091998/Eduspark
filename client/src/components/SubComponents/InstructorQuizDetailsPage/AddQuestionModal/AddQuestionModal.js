import React, { Component } from 'react'
import { connect } from "react-redux"
import { setPopup , setAddQuestionModal , setQuestionFields , addQuestion } from "../../../../actions/index"

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

class AddQuestionModal extends Component {
  
  handleQuestionFields = (e) =>{
    this.props.setQuestionFields(e.target.name,e.target.value)
  }

  handleClose = () => {
    const { setAddQuestionModal , setQuestionFields } = this.props;
    
    setQuestionFields("question","")
    setQuestionFields("option1","")
    setQuestionFields("option2","")
    setQuestionFields("option3","")
    setQuestionFields("option4","")
    setQuestionFields("correctAnswer","")
    setAddQuestionModal(false)
  }

  handleAddition = () => {  
    const { question , option1 , option2 , option3 , option4 , correctAnswer , setPopup , addQuestion , courseId , quizNumber } = this.props;

    if(isEmpty({ question , option1 , option2 , option3 , option4 , correctAnswer })){
      setPopup(true,"Enter all fields","error")
      return;
    }  

    const questionDetails = { question , option1 , option2 , option3 , option4 , correctAnswer }

    const ids = { courseId , quizNumber }

    addQuestion(questionDetails,ids);
  }


  render(){
    const { addQuestionModal , question , option1 , option2 , option3 , option4 , correctAnswer } = this.props;
  
    const { modal , main , closeicon , head , fields , btn , fieldBorder} = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ addQuestionModal }
        style={{zIndex:"1000"}}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}  
      >
        <Fade in={ addQuestionModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={this.handleClose}/>
            <div className={main}>
              <h1 className={head}>New Question</h1>
              <div className={fields}>
                <label htmlFor="question">Question</label>
                <textarea value={question} name="question" onChange={this.handleQuestionFields} id="question" />
              </div>
              <div className={fields}>
                <label htmlFor="option1">Option 1</label>
                <input value={option1} type="text" name="option1" onChange={this.handleQuestionFields} id="option1" />
              </div>
              <div className={fields}>
                <label htmlFor="option2">Option 2</label>
                <input value={option2} type="text" name="option2" onChange={this.handleQuestionFields} id="option2" />
              </div>
              <div className={fields}>
                <label htmlFor="option3">Option 3</label>
                <input value={option3} type="text" name="option3" onChange={this.handleQuestionFields} id="option3" />
              </div>
              <div className={fields}>
                <label htmlFor="option4">Option 4</label>
                <input value={option4} type="text" name="option4" onChange={this.handleQuestionFields} id="option4" />
              </div>
              <div className={`${fields} , ${fieldBorder}`}>
                <label htmlFor="correctAnswer">Correct Answer</label>
                <select name="correctAnswer" onChange={this.handleQuestionFields} id="correctAnswer" defaultValue={ correctAnswer !== "" ? correctAnswer: "default"}>
                  <option value="default" hidden disabled > Select Option </option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>
                </select>
              </div>
              <button className={btn} onClick={this.handleAddition}>Add Question</button>
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
    addQuestionModal : state.quizdetails.addQuestionModal,
    question : state.quizdetails.question,
    option1 : state.quizdetails.option1,
    option2 : state.quizdetails.option2,
    option3 : state.quizdetails.option3,
    option4: state.quizdetails.option4,
    correctAnswer : state.quizdetails.correctAnswer,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setQuestionFields : (name,value) => dispatch(setQuestionFields(name,value)),
    setAddQuestionModal : (status) => dispatch(setAddQuestionModal(status)),
    addQuestion : (questionDetails,ids) => dispatch(addQuestion(questionDetails,ids))
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(AddQuestionModal));