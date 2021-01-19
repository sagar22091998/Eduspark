import React , { Component } from 'react';
import { connect } from "react-redux"
import { setChangeModal , setProfileFields , changePassword , setPopup } from "../../../actions/index"
import { isEmpty } from "../../../utils/validators"
import MessagePopup from "../MessagePopup/MessagePopup"

//Material UI
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  modal: {
    margin : "300px auto 0 auto",
    fontWeight:"900",
    outline:"none",
    background: "#fff",
    borderRadius :"10px",
    position:"relative",
    border : "4px solid #000",
    width : "400px", 
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
    borderRadius:"50%",
    cursor:"pointer",
    border : "1px solid black"
  },
  head:{
    fontFamily: "'Kaushan Script', cursive",
    textShadow: "1.5px 1.5px #1761a0",  
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
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding : "1rem 2rem",
    borderTop:"4px solid #1761a0",

    "& input":{
      borderRadius:"5px",
      padding:"0.5rem",
      width:"150px",
      border :"1px solid #000",
      fontSize:"1.1rem"
    },
    "@media(max-width:550px)":{
      fontSize:"0.85rem",
      padding : "1rem",

      "& input":{
        padding:"0.5rem",
        fontSize:"0.85rem",
        width:"125px"
      }
    }
  },
  fieldBorder:{
    borderBottom:"4px solid #1761a0"
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
      background:"#000"
    },

    "@media(max-width:550px)":{
      padding:"0.5rem",  
      margin: "1rem 0",
      fontSize: "0.85rem"
    }
  }
}

class ChangePasswordModal extends Component {
  
  handleResetFields = (e) =>{
    this.props.setProfileFields(e.target.name,e.target.value)
  }

  handleClose = () => {
    const { setChangeModal , setProfileFields } = this.props;
    
    setProfileFields("oldPass","")
    setProfileFields("newPass","")
    setProfileFields("confirmPass","")
    setChangeModal(false)
  }

  handleChange = () => {  
    const { oldPass , newPass , confirmPass , setPopup , changePassword } = this.props;

    if(isEmpty({ oldPass , newPass , confirmPass })){
      setPopup(true,"Enter all fields","error")
      return;
    }  

    if(newPass.length < 8){
      setPopup(true,"New password length should be at least 8","error")
      return;
    }

    if(confirmPass !== newPass){
      setPopup(true,"New password & confirm password does not match","error")
      return;
    }

    if(oldPass === newPass){
      setPopup(true,"Old & New password should be different","error")
      return;
    }
    
    
    changePassword({oldPass , newPass});
  }


  render(){
    const { changeModal , oldPass , newPass , confirmPass } = this.props;
  
    const { modal , main , closeicon , head , fields , btn , fieldBorder} = this.props.classes;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ changeModal }
        style={{zIndex:"1000"}}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 400
        }}  
      >
        <Fade in={ changeModal }>
          <div className={modal}>
            <CloseIcon className={closeicon} onClick={this.handleClose}/>
            <div className={main}>
              <h1 className={head}>Change Password</h1>
              <div className={fields}>
                <label htmlFor="oldPass">Old Password</label>
                <input value={oldPass} type="password" name="oldPass" onChange={this.handleResetFields} id="oldPass" />
              </div>
              <div className={fields}>
                <label htmlFor="newPass">New Password</label>
                <input value={newPass} type="password" name="newPass" onChange={this.handleResetFields} id="newPass" />
              </div>
              <div className={`${fields} , ${fieldBorder}`}>
                <label htmlFor="confirmPass">Confirm New Password</label>
                <input value={confirmPass} type="password" name="confirmPass" onChange={this.handleResetFields} id="confirmPass" />
              </div>
              <button className={btn} onClick={this.handleChange}>Change Password</button>
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
    oldPass : state.profile.oldPass,
    newPass : state.profile.newPass,
    confirmPass : state.profile.confirmPass,
    changeModal : state.profile.changeModal
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setChangeModal : (status) => dispatch(setChangeModal(status)),
    setProfileFields : (name,value) => dispatch(setProfileFields(name,value)),
    changePassword : (passwords) => dispatch(changePassword(passwords)),    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType))
  }
}

export default withStyles(styles)(connect( mapStatesToProps , mapDispatchToProps )(ChangePasswordModal));