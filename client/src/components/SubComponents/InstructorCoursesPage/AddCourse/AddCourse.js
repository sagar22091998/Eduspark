import React, { Component } from 'react'
import { connect } from "react-redux"
import { setPopup , setAddModal , setCoursesFields , addNewCourse } from "../../../../actions/index"

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

    "& input,& textarea":{
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

      "& input,& textarea":{
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

class AddCourse extends Component {
  
  handleCourseFields = (e) =>{
    this.props.setCoursesFields(e.target.name,e.target.value)
  }

  handleClose = () => {
    const { setAddModal , setCoursesFields } = this.props;
    
    setCoursesFields("courseName","")
    setCoursesFields("coursePrice","")
    setCoursesFields("courseDescription","")
    setAddModal(false)
  }

  handleAddition = () => {  
    const { courseName , coursePrice , courseDescription , setPopup , addNewCourse } = this.props;

    if(isEmpty({ courseName , coursePrice , courseDescription })){
      setPopup(true,"Enter all fields","error")
      return;
    }  

    if(coursePrice <= 0){
      setPopup(true,"Invalid Price Amount","error")
      return;
    }  

    addNewCourse({courseName , coursePrice , courseDescription});
  }


  render(){
    const { addModal , courseName , coursePrice , courseDescription } = this.props;
  
    const { modal , main , closeicon , head , fields , btn , fieldBorder} = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ addModal }
        style={{zIndex:"1000"}}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}  
      >
        <Fade in={ addModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={this.handleClose}/>
            <div className={main}>
              <h1 className={head}>New Course</h1>
              <div className={fields}>
                <label htmlFor="courseName">Course Title</label>
                <input value={courseName} type="text" name="courseName" onChange={this.handleCourseFields} id="courseName" />
              </div>
              <div className={fields}>
                <label htmlFor="coursePrice">Price (in ₹)</label>
                <input value={coursePrice} type="number" name="coursePrice" onChange={this.handleCourseFields} id="coursePrice" />
              </div>
              <div className={`${fields} , ${fieldBorder}`}>
                <label htmlFor="courseDescription">Course Description</label>
                <textarea value={courseDescription} name="courseDescription" onChange={this.handleCourseFields} id="courseDescription" />
              </div>
              <button className={btn} onClick={this.handleAddition}>Add Course!</button>
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
    courseName : state.courses.courseName,
    courseDescription : state.courses.courseDescription,
    coursePrice : state.courses.coursePrice,
    addModal : state.courses.addModal,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setCoursesFields : (name,value) => dispatch(setCoursesFields(name,value)),
    setAddModal : (status) => dispatch(setAddModal(status)),
    addNewCourse : (courseDetails) => dispatch(addNewCourse(courseDetails))
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(AddCourse));