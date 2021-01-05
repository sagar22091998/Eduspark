import { SET_MESSAGE } from "../actions/actionTypes"

const intialState = {
  statusPopup : false , 
  popupText : "" ,
  popupType : "" 
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
    default :
      return state;    
  }
}
