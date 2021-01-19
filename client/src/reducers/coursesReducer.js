import { SET_COURSES_FIELDS , SET_COURSES_LIST, SET_DELETE_COURSES_MODAL , SET_COURSES_LOADING , SET_ADD_COURSES_MODAL , SET_SELECTED_COURSE , SET_EDIT_MODAL } from "../actions/actionTypes"

const intialState = {
  //Course
  courseName : "",
  courseDescription : "",
  coursePrice : "",
  addModal : false,

  coursesList : "",
  coursesLoading : true,
  
  deleteModal : false,
  editModal : false,
  
  oldName : "",
  oldPrice : "",
  oldDescription : "",
  newName : "",
  newPrice : "",
  newDescription : "",

  //Used in detials page too

  selectedCourse : ""
}

export default (state = intialState , action ) => { 

  switch(action.type){
    case SET_COURSES_LIST :
      return {
        ...state,
        coursesList : action.list
      }  
    case SET_SELECTED_COURSE :
      return {
        ...state,
        selectedCourse : action.id
      }  
    case SET_ADD_COURSES_MODAL :
      return {
        ...state,
        addModal : action.status
      }  
    case SET_DELETE_COURSES_MODAL :
      return {
        ...state,
        deleteModal : action.status
      }  
    case SET_EDIT_MODAL :
      if(action.status){
        return {
          ...state,
          editModal : action.status,
          oldName : action.oldDetails.title,
          oldPrice : action.oldDetails.price,
          oldDescription : action.oldDetails.desc,
          newName : action.oldDetails.title,
          newPrice : action.oldDetails.price,
          newDescription : action.oldDetails.desc
        }   
      } 
      else {
        return {
          ...state,
          editModal : action.status
        }   
      }
    case SET_COURSES_LOADING :
      return {
        ...state,
        coursesLoading : action.status
      }  
    case SET_COURSES_FIELDS :
      return {
        ...state,
        [action.name] : action.value
      }  
    default :
      return state;    
  }
}
