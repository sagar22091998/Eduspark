import { SET_SUBSCRIPTION_LOADING , SET_SUBSCRIPTION_LIST, TOGGLE_VIDEOQUIZ , SET_ALLSUBSCRIPTIONS_LOADING, SET_SUBSCRIPTION_DETAIL , SET_SUBS_QUIZ_LIST , SET_SUBS_QUIZ_LOADING , SET_UNLOCK_NEXT , SET_SUBS_CURRENT_VIDEO , SET_SUBS_QUIZ_DETAIL , SET_SUBS_QUIZDETAIL_LOADING , SET_START_QUIZ_MODAL, SET_LEADERBOARD_LOADING , SET_LEADERBOARD , SET_SELECTED_OPTIONS} from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"
// import { setPopup } from "./index"

export const toggleVideoQuiz = (status) => ({ type : TOGGLE_VIDEOQUIZ , status })

export const setSelectedOptions = (selectedOptions) => ({ type : SET_SELECTED_OPTIONS , selectedOptions })

export const setUnlockNext = (status) => ({ type : SET_UNLOCK_NEXT , status })

export const setStartQuizModal = ( status , quizNumber = "" , isAttempted = false) => ({ type : SET_START_QUIZ_MODAL , status , quizNumber , isAttempted })

export const setStudentCurrentVideo = (videoNumber) =>  ( dispatch , getState ) => {
  const { subscriptionDetail } = getState().student;

  dispatch({ 
    type : SET_SUBS_CURRENT_VIDEO , 
    currentVideo : {
      publicId : subscriptionDetail.videos[videoNumber-1].publicId, 
      videoNumber : subscriptionDetail.videos[videoNumber-1].videoNumber 
    } 
  })
}

export const getSubscriptionsList = () => async ( dispatch ) => {
  
  dispatch({ type : SET_ALLSUBSCRIPTIONS_LOADING , status : true })
  const token = localStorage.getItem('token'); 

  const res = await requestHandler("student/course/subscribed", {
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  const listData = await res.json();

  if(res.status===200){
    dispatch(({ type : SET_SUBSCRIPTION_LIST , list : listData.data }));
    dispatch({ type : SET_ALLSUBSCRIPTIONS_LOADING , status : false })
  } 
  else {
    console.log("List not found.");
  }
}

export const getSubscriptionDetail = ( courseId ) => async ( dispatch ) => {
  
  dispatch({ type : SET_SUBSCRIPTION_LOADING , status : true })
  const token = localStorage.getItem('token'); 

  const res = await requestHandler(`student/course/progress/${courseId}`, {
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  const videoData = await res.json();
  
  if(res.status===200){

    dispatch(({ type : SET_SUBSCRIPTION_DETAIL , detail : videoData.data , lastCompletedVideo : videoData.data.enroll.videoCompleted }));
    
    if(videoData.data.videos[videoData.data.enroll.videoCompleted-1]){
      dispatch({ 
        type : SET_SUBS_CURRENT_VIDEO , 
        currentVideo : {
          publicId : videoData.data.videos[videoData.data.enroll.videoCompleted-1].publicId, 
          videoNumber : videoData.data.videos[videoData.data.enroll.videoCompleted-1].videoNumber 
        } 
      })
    } 
    else{
      dispatch({ 
        type : SET_SUBS_CURRENT_VIDEO , 
        currentVideo : ""
      })
    } 

    dispatch({ type : SET_SUBSCRIPTION_LOADING , status : false })
  } 
  else {
    console.log("List not found.");
  }
}

export const updateProgress = ( courseId ) => async ( dispatch ) => {
  
  const token = localStorage.getItem('token'); 
  dispatch(setUnlockNext(false))

  const res = await requestHandler(`student/course/progress/${courseId}`, {
    method:"PUT",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },    
    body: JSON.stringify({
      videoProgress : 95,
    })
  })

  if(res.status===200){
    return;
  } 
  else {
    console.log("Progress Not Updated");
  }
}


export const getSubscriptionQuizes = ( courseId ) => async ( dispatch ) => {
  
  dispatch({ type : SET_SUBS_QUIZ_LOADING , status : true })
  const token = localStorage.getItem('token'); 

  const res = await requestHandler(`student/quiz/list/${courseId}`, {
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  const quizData = await res.json();

  if(res.status===200){
    dispatch(({ type : SET_SUBS_QUIZ_LIST, list : quizData.data   }));
    dispatch({ type : SET_SUBS_QUIZ_LOADING , status : false })
  } 
  else {
    console.log("Quiz list not found.");
  }
}


export const getQuizLeaderboard = (courseId,quizNumber) => async ( dispatch ) => {
  
  dispatch({ type : SET_LEADERBOARD_LOADING , status : true })
  const token = localStorage.getItem('token'); 
  
  const res = await requestHandler(`student/quiz/leaderboard/${courseId}?quiz=${quizNumber}`, {
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })
  
  const quizData = await res.json();
  
  if(res.status===200){
    dispatch(({ type : SET_LEADERBOARD, board : quizData.data.allScores}));
    dispatch({ type : SET_LEADERBOARD_LOADING , status : false })
  }
}

export const startAttempt = (courseId,quizNumber) => async ( dispatch ) => {
  
  dispatch({ type : SET_SUBS_QUIZDETAIL_LOADING , status : true })
  const token = localStorage.getItem('token'); 

  const res = await requestHandler(`student/quiz/start/${courseId}?quiz=${quizNumber}`, {
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  const quizData = await res.json();

  if(res.status===200){
    dispatch(({ type : SET_SUBS_QUIZ_DETAIL , detail : quizData.data}));
    dispatch({ type : SET_SUBS_QUIZDETAIL_LOADING , status : false })
  } 
  else {
    console.log("Quiz Start Failed")
  }
}

export const submitAttempt = (courseId,quizNumber,finalOptions,history) => async () => {
  
  const token = localStorage.getItem('token'); 

  const res = await requestHandler(`student/quiz/end/${courseId}?quiz=${quizNumber}`, {
    method:"POST",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },    
    body: JSON.stringify({
      answers : finalOptions
    })
  })

  if(res.status===200){
    console.log("Quiz Submitted Successfully")
    history.push(`/subscription/${courseId}/leaderboards/${quizNumber}`);
  } 
  else {
    console.log("Quiz Submission Failed")
  }
}