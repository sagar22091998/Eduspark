import { SET_SUBSCRIPTION_LIST , SET_ALLSUBSCRIPTIONS_LOADING , TOGGLE_VIDEOQUIZ , SET_SUBSCRIPTION_LOADING , SET_SUBSCRIPTION_DETAIL , SET_SUBS_QUIZ_LOADING , SET_SUBS_QUIZ_LIST , SET_UNLOCK_NEXT , SET_SUBS_CURRENT_VIDEO , SET_SUBS_QUIZDETAIL_LOADING , SET_SUBS_QUIZ_DETAIL , SET_START_QUIZ_MODAL , SET_LEADERBOARD , SET_LEADERBOARD_LOADING , SET_SELECTED_OPTIONS } from "../actions/actionTypes"

const intialState = {
  subscriptionsList : "",
  subscriptionsLoading : true,

  isVideoPlayer : true,
  subscriptionDetail : "",
  videosLoading : true,
  currentVideo : "",
  lastCompletedVideo : "",
  unlockNext : true,

  quizesLoading : true,
  quizList : "",
  
  startQuizModal : false,
  startQuizNumber : "",
  quizIsAttempted : false, 
  
  leaderboard : "",
  leaderboardLoading : true,

  quizDetailLoading : true,
  quizAttemptDetail : "",
  selectedOptions : []
}

export default (state = intialState , action ) => { 

  switch(action.type){
    case SET_SUBS_QUIZ_DETAIL :
      return {
        ...state,
        quizAttemptDetail : action.detail
      }  
    case SET_START_QUIZ_MODAL :
      return {
        ...state,
        startQuizModal : action.status,
        startQuizNumber : action.quizNumber,
        quizIsAttempted : action.isAttempted
      }  
    case SET_SUBSCRIPTION_LIST :
      return {
        ...state,
        subscriptionsList : action.list
      }  
    case SET_SUBS_QUIZDETAIL_LOADING :
      return {
        ...state,
        quizDetailLoading : action.status
      }  
    case SET_LEADERBOARD :
      return {
        ...state,
        leaderboard : action.board
      }  
    case SET_SELECTED_OPTIONS :
      return {
        ...state,
        selectedOptions : action.selectedOptions
      }  
    case SET_LEADERBOARD_LOADING :
      return {
        ...state,
        leaderboardLoading : action.status
      }  
    case SET_ALLSUBSCRIPTIONS_LOADING :
      return {
        ...state,
        subscriptionsLoading : action.status
      }  
    case SET_SUBS_CURRENT_VIDEO :
      return {
        ...state,
        currentVideo : action.currentVideo,
      }  
    case SET_SUBS_QUIZ_LIST :
      return {
        ...state,
        quizList : action.list
      }  
    case SET_SUBS_QUIZ_LOADING :
      return {
        ...state,
        quizesLoading : action.status
      }  
    case SET_UNLOCK_NEXT :
      return {
        ...state,
        unlockNext : action.status
      }  
    case SET_SUBSCRIPTION_DETAIL :
      return {
        ...state,
        subscriptionDetail : action.detail,
        lastCompletedVideo : action.lastCompletedVideo
      }  
    case SET_SUBSCRIPTION_LOADING :
      return {
        ...state,
        videosLoading : action.status
      }  
    case TOGGLE_VIDEOQUIZ :
      return {
        ...state,
        isVideoPlayer : action.status
      }  
    // case SET_COURSES_FIELDS :
    //   return {
    //     ...state,
    //     [action.name] : action.value
    //   }  
    default :
      return state;    
  }
}
