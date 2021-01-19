import React, { Component } from 'react'
import { connect } from "react-redux"
import { setPopup } from "../../../actions/index"

// Material UI
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={8} variant="filled" {...props} />;
}

class MessagePopup extends Component {

  render() {
    const { statusPopup , setPopup , popupText , popupType } = this.props;
    const style = {
      display:"flex",
      justifyContent:"space-around",
      alignItems:"center",
      fontSize:"1.1rem",
      padding:"0 1rem 0 0"
    }

    const cross ={
      position : "absolute",
      top : "22.5%",
      right : "2.5%",
      cursor :"pointer"
    }

    return (
      <Snackbar
        open={statusPopup} 
        onClose={() => setPopup(false,popupText,popupType)} 
        autoHideDuration={2500}
        >
        <Alert severity={popupType}>
          <div style={style}>
            <span>{popupText}</span>
            <CloseIcon style={cross} onClick={() => setPopup(false,popupText,popupType)}/>
          </div>
        </Alert>
      </Snackbar>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    statusPopup : state.common.statusPopup,
    popupText : state.common.popupText,
    popupType : state.common.popupType,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(MessagePopup); 
