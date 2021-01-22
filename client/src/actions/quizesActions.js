import { SET_QUIZES_FIELDS , SET_QUIZES_LIST , SET_QUIZES_LOADING , SET_ADD_QUIZES_MODAL , SET_SELECTED_QUIZ , SET_EDIT_QUIZ_MODAL } from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"
import { setPopup , setDeleteModal } from "./index"

export const setQuizesFields = (name,value) => ({ type : SET_QUIZES_FIELDS , name , value })

export const setQuizAddModal = (status) => ({ type : SET_ADD_QUIZES_MODAL , status })

export const setEditQuizModal = ( status , oldDetails = {}) => ({ type : SET_EDIT_QUIZ_MODAL , status , oldDetails })

export const setSelectedQuiz = (id) => ({ type : SET_SELECTED_QUIZ , id })

export const getQuizesList = (courseId) => async ( dispatch ) => {
  
  dispatch({ type : SET_QUIZES_LOADING , status : true })
  const token = localStorage.getItem('token'); 

  const res = await requestHandler(`instructor/quiz/list/${courseId}`, {
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  const listData = await res.json();

  if(res.status===200){
    dispatch(({ type : SET_QUIZES_LIST , list : listData.data }));
    dispatch({ type : SET_QUIZES_LOADING , status : false })
  } 
  else {
    console.log("List not found.");
  }
}

export const addNewQuiz = (courseId,quizDetails) => async ( dispatch ) => {

  const token = localStorage.getItem('token'); 

  const res = await requestHandler(`instructor/quiz/create/${courseId}`, {
    method:"POST",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      topic : quizDetails.quizName,
      description : quizDetails.quizDescription,
      totalTime : quizDetails.quizTime
    })
  })

  if(res.status===201){
    dispatch(setQuizesFields("quizName",""));
    dispatch(setQuizesFields("quizTime",""));
    dispatch(setQuizesFields("quizDescription",""));
    dispatch(setQuizAddModal(false));
    dispatch(getQuizesList(courseId));
    dispatch(setPopup(true,"New Quiz Added ","success"));
  } 
  else {
    console.log("Quiz not created");
  }
}

export const deleteQuiz = (courseId) => async ( dispatch , getState ) => {

  const token = localStorage.getItem('token');
  const { selectedQuiz } = getState().quizes;
  
  const res = await requestHandler(`instructor/quiz/delete/${courseId}?quiz=${selectedQuiz}`, {
    method:"DELETE",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  if(res.status===200){
    dispatch(setDeleteModal(false));
    dispatch(getQuizesList(courseId));
    dispatch(setPopup(true,"Quiz Removed Successfully","warning"));
  } 
  else {
    console.log("Quiz not removed.");
  }
}

export const updateQuiz = (courseId,newDetails) => async (dispatch,getState) => {

  const token = localStorage.getItem('token'); 
  const { selectedQuiz } = getState().quizes;

  console.log(courseId,selectedQuiz,newDetails)

  const res = await requestHandler(`instructor/quiz/update/${courseId}?quiz=${selectedQuiz}`, {
    method:"PUT",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      topic : newDetails.newName,
      description : newDetails.newDescription,
      totalTime : newDetails.newTime
    })
  })

  if(res.status===200){
    dispatch(setEditQuizModal(false));
    dispatch(getQuizesList(courseId));
    dispatch(setPopup(true,"Quiz Details Updated ","success"));
  } 
  else {
    console.log("Quiz not updated");
  }
}