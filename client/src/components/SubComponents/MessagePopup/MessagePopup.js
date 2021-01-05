import React, { Component } from 'react'
import { connect } from "react-redux"
import { setPopup } from "../../../actions/index"

// Material UI
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class MessagePopup extends Component {

  render() {
    const { statusPopup , setPopup , popupText , popupType } = this.props;
    const style = {
      display:"flex",
      justifyContent:"space-around",
      alignItems:"center",
      fontWeight:"900"
    }

    return (
      <Snackbar
        open={statusPopup} 
        onClose={() => setPopup(false,popupText,popupType)} 
        autoHideDuration={2500} 
        >

        <Alert severity={popupType}>
          <span style={style}>
            {popupText}
            <CloseIcon onClick={() => setPopup(false,popupText,popupType)}/>
          </span>
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
