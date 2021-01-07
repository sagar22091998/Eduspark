import { SET_SELECTED_PAGE , SET_AUTH_FIELDS , SET_LOGINSTATUS } from "../actions/actionTypes"

const intialState = {
  selectedPage : "",

  //Login
  isLoggedIn : false,
  inputEmail : "",
  inputPassword : "",

  //Register
  registerName : "",
  registerEmail : "",
  registerPassword : "",
  registerConfirm : "",
  registerMobile : "",
}

export default (state = intialState , action ) => { 

  switch(action.type){
    case SET_SELECTED_PAGE :
      return {
        ...state,
        selectedPage : action.page
      }  
    case SET_AUTH_FIELDS :
      return {
        ...state,
        [action.name] : action.value
      }  
    case SET_LOGINSTATUS :
      return {
        ...state,
        isLoggedIn : action.status
      }  
    default :
      return state;    
  }
}
