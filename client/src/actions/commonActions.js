import { SET_MESSAGE , SET_MOBILE_NAVBAR , SET_ALL_PUBLIC_COURSES } from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"

export const setPopup = ( status , text , popupType ) => ({ type : SET_MESSAGE , status , text , popupType })

export const setMobileDropdown = (status) => ({ type : SET_MOBILE_NAVBAR , status })

export const getAllCoursesList = () => async ( dispatch , getState ) => {

  const { isLoggedIn } = getState().auth; 
  let reqHeaders;

  if(!isLoggedIn){
    reqHeaders = { 
      "Content-Type":"application/json"
    }
  }
  else{
    const token = localStorage.getItem('token');
    reqHeaders = { 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  }

  const res = await requestHandler(`course/${isLoggedIn?"login-":""}list?page=0`, {
    method : "GET",
    headers : reqHeaders
  })

  const listData = await res.json();

  if(res.status===200){
    dispatch(({ type : SET_ALL_PUBLIC_COURSES , allCourses : listData.data }));
  } 
  else {
    console.log("List not found.");
  }
}

export const payment = (courseId,history) => async (dispatch , getState ) => {
  
  const token = localStorage.getItem('token');
  const { profileName , profileEmail , profileMobile } = getState().profile; 

  const res = await requestHandler("student/course/initiate", {
    method:"POST",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      courseId : courseId    
    })
  })
  const regData = await res.json()

  const options = {
    key: process.env.REACT_APP_RAZORPAY_ID,
    name: "Eduspark",
    currency: regData.data.currency,
    amount: regData.data.amount,
    description: "Learning",
    order_id: regData.data.id,
    handler: async (response) => {
      dispatch(setPopup(true,"Course Purchase Successful","success"));
      dispatch(getAllCoursesList());
      history.push("/mysubscriptions");
    },
    prefill: {
      name: profileName,
      email: profileEmail,
      contact: profileMobile
    },
    theme: {
      color: "#686CFD",
    }
  }
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}