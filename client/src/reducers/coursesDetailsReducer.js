import { SET_DETAIL_FIELDS , SET_UPLOAD_STATUS , SET_VIDEO_LIST , SET_VIDEOS_LOADING , SET_CURRENT_VIDEO , SET_EDIT_TITLE_MODAL } from "../actions/actionTypes"

const intialState = {
  // Course Details
  videoTitle : "",
  uploadStatus : false,
  uploadPublicId : "",
  
  allVideosList : "",
  videosLoading : true,
  currentVideo : "",

  editTitleModal : false,
  newTitle:"",
  oldTitle:"",

  //Details
  description:"",
  price:"",
  name:"",
  studentEnrolled:""
}

export default (state = intialState , action ) => { 

  switch(action.type){  
    case SET_DETAIL_FIELDS :
      return {
        ...state,
        [action.name] : action.value
      }  
    case SET_UPLOAD_STATUS :
      if(action.status){
        return {
          ...state,
          uploadStatus : action.status,
          uploadPublicId : action.publicId
        }  
      } else {
        return {
          ...state,
          uploadStatus : action.status,
          uploadPublicId : ""
        }  
      } 
    case SET_VIDEOS_LOADING :
      return {
        ...state,
        videosLoading : action.status
      }  
    case SET_EDIT_TITLE_MODAL :
      return {
        ...state,
        editTitleModal : action.status,
        oldTitle : action.oldTitle,
        newTitle : action.oldTitle
      }  
    case SET_VIDEO_LIST :
      return {
        ...state,
        allVideosList : action.list,
        currentVideo : action.first,
        description:action.description,
        price:action.price,
        name:action.name,
        studentEnrolled:action.enrolled
      }  
    case SET_CURRENT_VIDEO :
      return {
        ...state,
        currentVideo : action.publicId
      }  
    default :
      return state;    
  }
}
