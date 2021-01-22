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

  const res = await requestHandler(`instructor/quiz/details/${ids.courseId}?quiz=${ids.quizNumber}`, {
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

export const deleteQuestion = (ids) => async ( dispatch , getState ) => {
  
  const token = localStorage.getItem('token');
  const { currentQuestion } = getState().quizdetails;

  const res = await requestHandler(`instructor/question/delete/${ids.courseId}?quiz=${ids.quizNumber}&question=${currentQuestion}`, {
    method:"DELETE",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  if(res.status===200){
    dispatch(setPopup(true,"Question removed","warning"));
    dispatch(getAllQuestions(ids));
    dispatch(setDeleteModal(false));
  } 
  else {
    console.log("Question not removed.");
  }
}

export const updateQuestion = (questionDetails,ids) => async ( dispatch , getState ) => {
  
  const token = localStorage.getItem('token');
  const { currentQuestion } = getState().quizdetails;

  const res = await requestHandler(`instructor/question/update/${ids.courseId}?quiz=${ids.quizNumber}&question=${currentQuestion}`, {
    method:"PUT",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      question : questionDetails.newQuestion,
      option1 : questionDetails.newOption1,
      option2 : questionDetails.newOption2,
      option3 : questionDetails.newOption3,
      option4 : questionDetails.newOption4,
      correctAnswer : questionDetails.newCorrectAnswer
    })
  })

  if(res.status===200){
    dispatch(setPopup(true,"Question Updated","success"));
    dispatch(getAllQuestions(ids));
    dispatch(setEditQuestionModal(false));
  } 
  else {
    console.log("Question not updated.");
  }
}