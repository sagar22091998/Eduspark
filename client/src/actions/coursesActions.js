import { SET_COURSES_FIELDS , SET_COURSES_LIST, SET_ADD_COURSES_MODAL , SET_COURSES_LOADING , SET_DELETE_COURSES_MODAL , SET_SELECTED_COURSE , SET_EDIT_MODAL } from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"
import { setPopup } from "./index"

export const setCoursesFields = (name,value) => ({ type : SET_COURSES_FIELDS , name , value })

export const setAddModal = (status) => ({ type : SET_ADD_COURSES_MODAL , status })

export const setEditModal = ( status , oldDetails = {}) => ({ type : SET_EDIT_MODAL , status , oldDetails })

export const setDeleteModal = (status) => ({ type : SET_DELETE_COURSES_MODAL , status })

export const setSelectedCourse = (id) => ({ type : SET_SELECTED_COURSE , id })

export const getCoursesList = () => async ( dispatch ) => {
  
  dispatch({ type : SET_COURSES_LOADING , status : true })
  const token = localStorage.getItem('token'); 

  const res = await requestHandler("instructor/course/list", {
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  const listData = await res.json();

  if(res.status===200){
    dispatch(({ type : SET_COURSES_LIST , list : listData.data }));
    dispatch({ type : SET_COURSES_LOADING , status : false })
  } 
  else {
    console.log("List not found.");
  }
}

export const addNewCourse = ( courseDetails ) => async ( dispatch ) => {

  const token = localStorage.getItem('token'); 

  const res = await requestHandler("instructor/course/create", {
    method:"POST",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      name : courseDetails.courseName,
      description : courseDetails.courseDescription,
      price : courseDetails.coursePrice
    })
  })

  if(res.status===201){
    dispatch(setCoursesFields("courseName",""));
    dispatch(setCoursesFields("coursePrice",""));
    dispatch(setCoursesFields("courseDescription",""));
    dispatch(setAddModal(false));
    dispatch(getCoursesList());
    dispatch(setPopup(true,"New Course Added ","success"));
  } 
  else {
    console.log("Course not created");
  }
}

export const deleteCourse = () => async ( dispatch , getState ) => {

  const token = localStorage.getItem('token');
  const { selectedCourse } = getState().courses;
  
  const res = await requestHandler(`instructor/course/delete/${selectedCourse}`, {
    method:"DELETE",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  if(res.status===200){
    dispatch(setDeleteModal(false));
    dispatch(getCoursesList());
    dispatch(setPopup(true,"Course Removed Successfully","warning"));
  } 
  else {
    console.log("Course not removed.");
  }
}

export const updateCourse = ( newDetails ) => async (dispatch,getState) => {

  const token = localStorage.getItem('token'); 
  const { selectedCourse } = getState().courses;

  const res = await requestHandler(`instructor/course/update/${selectedCourse}`, {
    method:"PUT",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      name : newDetails.newName,
      description : newDetails.newDescription,
      price : newDetails.newPrice
    })
  })

  if(res.status===200){
    dispatch(setEditModal(false));
    dispatch(getCoursesList());
    dispatch(setPopup(true,"Course Details Updated ","success"));
  } 
  else {
    console.log("Course not updated");
  }
}