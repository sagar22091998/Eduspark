import { SET_PROFILE_FIELDS , SET_PROFILE , SET_EDITABLE , SET_RESET_PASSWORD_MODAL } from "../actions/actionTypes"

const intialState = {
  //Profile
  profileName : "",
  profileEmail : "",
  profileMobile : "",
  newName : "",
  newEmail : "",
  newMobile : "",
  editName : false,
  editEmail : false,
  editMobile : false,

  //Reset Password
  oldPass : "",
  newPass : "",
  confirmPass : "",
  changeModal : false
}

export default (state = intialState , action ) => { 

  switch(action.type){
    case SET_PROFILE :
      return {
        ...state,
        profileName : action.name,
        profileEmail : action.email,
        profileMobile : action.mobile,
        newName : action.name,
        newEmail : action.email,
        newMobile : action.mobile
      }  
    case SET_PROFILE_FIELDS :
      return {
        ...state,
        [action.name] : action.value
      }  
    case SET_RESET_PASSWORD_MODAL :
      return {
        ...state,
        changeModal : action.status
      }  
    case SET_EDITABLE :
      return {
        ...state,
        [action.name] : action.status
      }  
    default :
      return state;    
  }
}
