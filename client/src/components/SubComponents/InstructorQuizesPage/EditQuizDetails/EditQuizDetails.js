import React , { Component } from 'react';
import { connect } from "react-redux"
import { setQuizesFields , setEditQuizModal , updateQuiz , setPopup } from "../../../../actions/index"
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
    "@media(max-width:1600px)":{
      margin : "100px auto 0 auto",
    },
    "@media(max-width:550px)":{
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
    "&:disabled":{
      cursor : "default",
      background: "#bbb",
      color: "#000"
    },

    "@media(max-width:550px)":{
      padding:"0.5rem",  
      margin: "1rem 0",
      fontSize: "0.85rem"
    }
  }
}

class EditQuizDetails extends Component {
  
  handleQuizFields = (e) =>{
    this.props.setQuizesFields(e.target.name,e.target.value)
  }

  handleUpdate = () => {  
    const { newName , newTime , newDescription , setPopup , updateQuiz , courseId} = this.props;

    if(isEmpty({ newName , newTime , newDescription })){
      setPopup(true,"Enter all fields","error")
      return;
    }  

    updateQuiz(courseId,{ newName , newTime , newDescription });
  }


  render(){
    const { editQuizModal , newName , newTime , newDescription , oldName , oldTime , oldDescription , setEditQuizModal } = this.props;
  
    const { modal , main , closeicon , head , fields , btn , fieldBorder} = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ editQuizModal }
        style={{zIndex:"1000"}}
        onClose={() => setEditQuizModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}  
      >
        <Fade in={ editQuizModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={() => setEditQuizModal(false)}/>
            <div className={main}>
              <h1 className={head}>Update Quiz</h1>
              <div className={fields}>
                <label htmlFor="newName">Quiz Title</label>
                <input value={newName} type="text" name="newName" onChange={this.handleQuizFields} id="newName" />
              </div>
              <div className={fields}>
                <label htmlFor="newTime">Time (in Minutes)</label>
                <select name="newTime" onChange={this.handleQuizFields} id="newTime" defaultValue={ newTime !== "" ? newTime: "default"}>
                  <option value="default" hidden disabled > Select Time </option>
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>
              <div className={`${fields} , ${fieldBorder}`}>
                <label htmlFor="newDescription">Quiz Description</label>
                <textarea value={newDescription} name="newDescription" onChange={this.handleQuizFields} id="newDescription" />
              </div>
              <button className={btn} onClick={this.handleUpdate} disabled={ oldName === newName && oldDescription === newDescription && oldTime === newTime }>Update</button>
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
    editQuizModal : state.quizes.editQuizModal ,
    oldName : state.quizes.oldName ,
    oldDescription : state.quizes.oldDescription ,
    oldTime : state.quizes.oldTime ,
    newName : state.quizes.newName ,
    newDescription : state.quizes.newDescription ,
    newTime : state.quizes.newTime
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setEditQuizModal : (status) => dispatch(setEditQuizModal(status)),
    setQuizesFields : (name,value) => dispatch(setQuizesFields(name,value)),
    updateQuiz : (courseId,newDetails) => dispatch(updateQuiz(courseId,newDetails)),    
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType))
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(EditQuizDetails));