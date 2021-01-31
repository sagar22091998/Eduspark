import { SET_SUBSCRIPTION_LOADING , SET_SUBSCRIPTION_LIST, TOGGLE_VIDEOQUIZ , SET_ALLSUBSCRIPTIONS_LOADING, SET_SUBSCRIPTION_DETAIL , SET_SUBS_QUIZ_LIST , SET_SUBS_QUIZ_LOADING , SET_UNLOCK_NEXT , SET_SUBS_CURRENT_VIDEO } from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"
// import { setPopup } from "./index"

export const toggleVideoQuiz = (status) => ({ type : TOGGLE_VIDEOQUIZ , status })

export const setUnlockNext = (status) => ({ type : SET_UNLOCK_NEXT , status })

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

    if(videoData.data.videos.length===0){
      dispatch({ type : SET_SUBSCRIPTION_LOADING , status : false })
      return;
    }

    dispatch(({ type : SET_SUBSCRIPTION_DETAIL , detail : videoData.data , lastCompletedVideo : videoData.data.enroll.videoCompleted }));
    dispatch({ 
      type : SET_SUBS_CURRENT_VIDEO , 
      currentVideo : {
        publicId : videoData.data.videos[videoData.data.enroll.videoCompleted-1].publicId, 
        videoNumber : videoData.data.videos[videoData.data.enroll.videoCompleted-1].videoNumber 
      } 
    })
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