import { SET_QUES_DETAIL_FIELDS , SET_QUES_LIST , SET_QUES_LOADING , SET_CURRENT_QUES , SET_EDIT_QUES_MODAL , SET_ADD_QUES_MODAL } from "../actions/actionTypes"

const intialState = {
  // Quiz Details  
  allQuestionsList : "",
  questionsLoading : true,
  currentQuestion : "",

  title:"",
  time:"",
  description:"",

  question : "",
  option1 : "",
  option2 : "",
  option3 : "",
  option4 : "",
  correctAnswer : "",

  addQuestionModal : false,

  editQuestionModal : false,
  oldQuestion : "",
  oldOption1 : "",
  oldOption2 : "",
  oldOption3 : "",
  oldQption4 : "",
  oldCorrectAnswer : "",
  newQuestion : "",
  newOption1 : "",
  newOption2 : "",
  newOption3 : "",
  newOption4 : "",
  newCorrectAnswer : ""
}

export default (state = intialState , action ) => { 

  switch(action.type){  
    case SET_QUES_DETAIL_FIELDS :
      return {
        ...state,
        [action.name] : action.value
      }  
    case SET_QUES_LOADING :
      return {
        ...state,
        questionsLoading : action.status
      }  
    case SET_EDIT_QUES_MODAL :
      if(action.status){
        return {
          ...state,
          editQuestionModal : action.status,
          oldQuestion : action.editDetails.question,
          oldOption1 : action.editDetails.options[0],
          oldOption2 : action.editDetails.options[1],
          oldOption3 : action.editDetails.options[2],
          oldOption4 : action.editDetails.options[3],
          oldCorrectAnswer : String(action.editDetails.correctAnswer),
          newQuestion : action.editDetails.question,
          newOption1 : action.editDetails.options[0],
          newOption2 : action.editDetails.options[1],
          newOption3 : action.editDetails.options[2],
          newOption4 : action.editDetails.options[3],
          newCorrectAnswer : String(action.editDetails.correctAnswer),
        }   
      } 
      else {
        return {
          ...state,
          editQuestionModal : action.status
        }   
      }
    case SET_ADD_QUES_MODAL :
      return {
        ...state,
        addQuestionModal : action.status
      }  
    case SET_QUES_LIST :
      return {
        ...state,
        allQuestionsList : action.list,
        description:action.description,
        time:action.time,
        title:action.title
      }  
    case SET_CURRENT_QUES :
      return {
        ...state,
        currentQuestion : action.currentQuestion
      }  
    default :
      return state;    
  }
}
