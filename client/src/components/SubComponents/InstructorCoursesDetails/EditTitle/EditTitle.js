import React , { Component } from 'react';
import { connect } from "react-redux"
import { setDetailFields , setEditTitleModal , editVideoTitle , setPopup } from "../../../../actions/index"
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
    border : "4px solid #AED6F1",
    width : "500px", 
    "@media(max-width:1600px)":{
      margin : "150px auto 0 auto",
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
    borderTop:"4px solid #AED6F1",
    borderBottom:"4px solid #AED6F1",

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

class EditTitle extends Component {

  handleUpdate = () => {  
    const { newTitle , editVideoTitle , courseId , setPopup } = this.props;

    if(isEmpty({ newTitle })){
      setPopup(true,"Title can't be empty","error")
      return;
    }  

    editVideoTitle(courseId,newTitle);
  }


  render(){
    const { editTitleModal , newTitle , oldTitle , setEditTitleModal , setDetailFields } = this.props;
  
    const { modal , main , closeicon , head , fields , btn } = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ editTitleModal }
        style={{zIndex:"1000"}}
        onClose={() => setEditTitleModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}  
      >
        <Fade in={ editTitleModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={() => setEditTitleModal(false)}/>
            <div className={main}>
              <h1 className={head}>Edit Video Title</h1>
              <div className={fields}>
                <label htmlFor="newTitle">Title</label>
                <input value={newTitle} type="text" name="newTitle" onChange={(e) => setDetailFields(e.target.name,e.target.value)} id="newTitle" />
              </div>
              <button className={btn} onClick={this.handleUpdate} disabled={ oldTitle === newTitle}>Update</button>
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
    newTitle : state.details.newTitle,
    oldTitle : state.details.oldTitle,
    editTitleModal : state.details.editTitleModal
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    editVideoTitle : (courseId,newTitle) => dispatch(editVideoTitle(courseId,newTitle)),    
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setEditTitleModal : (status) => dispatch(setEditTitleModal(status)),
    setDetailFields : (name,value) => dispatch(setDetailFields(name,value)),
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(EditTitle));