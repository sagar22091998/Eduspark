import { SET_CURRENT_QUES, SET_QUES_DETAIL_FIELDS , SET_QUES_LOADING, SET_QUES_LIST , SET_EDIT_QUES_MODAL , SET_ADD_QUES_MODAL } from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"
import { setPopup , setDeleteModal } from "./index"
import { returnToTop } from "../utils/utilityFunctions"

export const setQuestionFields = (name,value) => ({ type : SET_QUES_DETAIL_FIELDS , name , value })

export const setCurrentQuestion = (currentQuestion) => ({ type : SET_CURRENT_QUES , currentQuestion})

export const setEditQuestionModal = (status,editDetails={}) => ({ type : SET_EDIT_QUES_MODAL , status , editDetails})

export const setAddQuestionModal = (status) => ({ type : SET_ADD_QUES_MODAL , status })

export const getAllQuestions = (ids) => async ( dispatch ) => {
  
  dispatch(({ type : SET_QUES_LOADING , status : true }));
  
  const token = localStorage.getItem('token');

  const res = await requestHandler(`instructor/quiz/details/${ids.courseId}?quiz=${ids.quizNumber}`, {//5ff7684253aa168524e96a11?quiz=1
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })
  
  const questionData = await res.json();
  
  if(res.status===200){
    
    returnToTop();
    dispatch(({ type : SET_QUES_LIST , list : questionData.data.questions , description : questionData.data.description , time : questionData.data.totalTime , title : questionData.data.topic }));    
    
    dispatch(({ type : SET_QUES_LOADING , status : false }));
  } 
  else {
    console.log("Questions not obtained.");
  }
}

export const addQuestion = (questionDetails,ids) => async ( dispatch ) => {
  
  const token = localStorage.getItem('token');
  
  const res = await requestHandler(`instructor/question/create/${ids.courseId}?quiz=${ids.quizNumber}`, {
    method:"POST",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      question : questionDetails.question,
      option1 : questionDetails.option1,
      option2 : questionDetails.option2,
      option3 : questionDetails.option3,
      option4 : questionDetails.option4,
      correctAnswer : questionDetails.correctAnswer
    })
  })

  if(res.status===201){
    dispatch(setPopup(true,"Question added","success"));
    dispatch(setAddQuestionModal(false));
    dispatch(setQuestionFields("question",""));
    dispatch(setQuestionFields("option1",""));
    dispatch(setQuestionFields("option2",""));
    dispatch(setQuestionFields("option3",""));
    dispatch(setQuestionFields("option4",""));
    dispatch(setQuestionFields("correctAnswer",""));
    dispatch(getAllQuestions(ids));
  } 
  else {
    console.log("Videos not added.");
  }
}

// export const deleteVideo = (courseId) => async ( dispatch , getState ) => {
  
//   const token = localStorage.getItem('token');
//   const { currentVideo , allVideosList } = getState().details;

//   const videoIndex = allVideosList.find(video => video.publicId === currentVideo )

//   const res = await requestHandler(`instructor/video/delete/${courseId}?number=${videoIndex.videoNumber}`, {
//     method:"DELETE",
//     headers:{ 
//       "Content-Type":"application/json",
//       "Authorization" :`Bearer ${token}`
//     }
//   })

//   if(res.status===200){
//     dispatch(setPopup(true,"Video removed","warning"));
//     dispatch(getAllVideos(courseId));
//     dispatch(setDeleteModal(false));
//   } 
//   else {
//     console.log("Videos not removed.");
//   }
// }

// export const editVideoTitle = (courseId,newTitle) => async ( dispatch , getState ) => {
  
//   const token = localStorage.getItem('token');
//   const { currentVideo , allVideosList } = getState().details;

//   const videoIndex = allVideosList.find(video => video.publicId === currentVideo )

//   const res = await requestHandler(`instructor/video/update/${courseId}?number=${videoIndex.videoNumber}`, {
//     method:"PUT",
//     headers:{ 
//       "Content-Type":"application/json",
//       "Authorization" :`Bearer ${token}`
//     },
//     body: JSON.stringify({
//       topic : newTitle,
//       publicId : currentVideo
//     })
//   })

//   if(res.status===200){
//     dispatch(setPopup(true,"Video Title Updated","success"));
//     dispatch(getAllVideos(courseId));
//     dispatch(setEditTitleModal(false));
//     dispatch(setDetailFields("newTitle",""));
//   } 
//   else {
//     console.log("Videos not removed.");
//   }
// }

// export const changeOrder = (orderType,courseId) => async ( dispatch , getState ) => {
  
//   const token = localStorage.getItem('token');
//   const { currentVideo , allVideosList } = getState().details;

//   const videoIndex = allVideosList.find(video => video.publicId === currentVideo )

//   let reqBody;
//   if(orderType==="UP"){
//     reqBody = {
//       firstVideo : Number(videoIndex.videoNumber),
//       secondVideo : Number(videoIndex.videoNumber-1)
//     }
//   }
//   else if(orderType==="DOWN") {
//     reqBody = {
//       firstVideo : Number(videoIndex.videoNumber),
//       secondVideo : Number(videoIndex.videoNumber+1)
//     }
//   }

//   const res = await requestHandler(`instructor/video/shift/${courseId}`, {
//     method:"PUT",
//     headers:{ 
//       "Content-Type":"application/json",
//       "Authorization" :`Bearer ${token}`
//     },
//     body: JSON.stringify(reqBody)
//   })

//   if(res.status===200){
//     dispatch(setPopup(true,"Order changed","warning"));
//     dispatch(getAllVideos(courseId));
//   } 
//   else {
//     console.log("Order not changed");
//   }
// }
