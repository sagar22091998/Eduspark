import { SET_MESSAGE , SET_MOBILE_NAVBAR } from "../actions/actionTypes"

const intialState = {
  statusPopup : false , 
  popupText : "" ,
  popupType : "" ,

  mobileDropdown : false
}

export default (state = intialState , action ) => { 

  switch(action.type){
    case SET_MESSAGE :
      return {
        ...state,
        statusPopup : action.status,
        popupText : action.text,
        popupType : action.popupType 
      }
    case SET_MOBILE_NAVBAR :
      return {
        ...state,
        mobileDropdown : action.status
      }
    default :
      return state;    
  }
}
