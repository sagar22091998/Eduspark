import { SET_QUIZES_FIELDS , SET_QUIZES_LIST , SET_QUIZES_LOADING , SET_ADD_QUIZES_MODAL , SET_SELECTED_QUIZ , SET_EDIT_QUIZ_MODAL } from "../actions/actionTypes"

const intialState = {
  //Course
  quizName : "",
  quizDescription : "",
  quizTime : "",
  addQuizModal : false,

  quizesList : "",
  quizesLoading : true,
  
  deleteQuizModal : false,
  editQuizModal : false,
  
  oldName : "",
  oldTime : "",
  oldDescription : "",
  newName : "",
  newTime : "",
  newDescription : "",

  //Used in detials page too

  selectedQuiz : ""
}

export default (state = intialState , action ) => { 

  switch(action.type){
    case SET_QUIZES_LIST :
      return {
        ...state,
        quizesList : action.list
      }  
    case SET_SELECTED_QUIZ :
      return {
        ...state,
        selectedQuiz : action.id
      }  
    case SET_ADD_QUIZES_MODAL :
      return {
        ...state,
        addQuizModal : action.status
      }  
    case SET_EDIT_QUIZ_MODAL :
      if(action.status){
        return {
          ...state,
          editQuizModal : action.status,
          oldName : action.oldDetails.title,
          oldTime : String(action.oldDetails.time),
          oldDescription : action.oldDetails.desc,
          newName : action.oldDetails.title,
          newTime : String(action.oldDetails.time),
          newDescription : action.oldDetails.desc
        }   
      } 
      else {
        return {
          ...state,
          editQuizModal : action.status
        }   
      }
    case SET_QUIZES_LOADING :
      return {
        ...state,
        quizesLoading : action.status
      }  
    case SET_QUIZES_FIELDS :
      return {
        ...state,
        [action.name] : action.value
      }  
    default :
      return state;    
  }
}
