import { SET_SELECTED_PAGE , SET_AUTH_FIELDS , SET_LOGINSTATUS , SET_PROFILE } from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"
import { setPopup , getAllCoursesList } from "./index"
export const setSelectedPage = (page) => ({ type : SET_SELECTED_PAGE , page })

export const setAuthFields = (name,value) => ({ type : SET_AUTH_FIELDS , name , value })

export const setLoginStatus = (status) => ({ type : SET_LOGINSTATUS , status })

export const logoutHandler = () => async ( dispatch ) => {
  
  const token = localStorage.getItem('token'); 

  const res = await requestHandler("profile/logout", {
    method:"POST",
    headers:{ 
      "Authorization" :`Bearer ${token}`,
      "Content-Type":"application/json"
    }
  })

  if(res.status===200){
    dispatch(setLoginStatus(false));
    dispatch(getAllCoursesList());
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
  }
}

export const loginHandler = ( credentials ) => async ( dispatch ) => {
  
  const res = await requestHandler("profile/login", {
    method:"POST",
    headers:{ 
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      email : credentials.inputEmail,
      password : credentials.inputPassword
    })
  })
  const userData = await res.json()

  if(res.status===200){
    
    localStorage.setItem('token',userData.data.token);
    dispatch(setLoginStatus(true));
    
    //Expiration Time Calculation
    const remainingMilliseconds = 60 * 58 * 1000; //58 minutes
    const expiryDate = new Date (
      new Date().getTime() + remainingMilliseconds
    );
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    
    setTimeout(() => {
      dispatch(logoutHandler());
    }, remainingMilliseconds);

    dispatch(getAllCoursesList())
    dispatch(({ 
      type : SET_PROFILE , 
      name : userData.data.profile.name,
      email : userData.data.profile.email,
      mobile : userData.data.profile.mobileNumber
    }));
    dispatch(setPopup(true,"Logged in Successfully","success"));
  } 
  else {
    dispatch(setPopup(true,"Invalid Credentials/Login Failed","error"));
  }
}

export const registerHandler = ( userDetails ) => async ( dispatch ) => {
  
  const res = await requestHandler("profile/register", {
    method:"POST",
    headers:{ 
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      name : userDetails.registerName,
      email : userDetails.registerEmail,
      password : userDetails.registerPassword,
      mobileNumber : userDetails.registerMobile
    })
  })
  const regData = await res.json()

  if(res.status===201){
    
    localStorage.setItem('token',regData.data.token);
    dispatch(setLoginStatus(true));
    
    //Expiration Time Calculation
    const remainingMilliseconds = 60 * 9 * 1000;
    const expiryDate = new Date (
      new Date().getTime() + remainingMilliseconds
    );
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    
    setTimeout(() => {
      dispatch(logoutHandler());
    }, remainingMilliseconds);

    dispatch(getAllCoursesList())
    dispatch(({ 
      type : SET_PROFILE , 
      name : regData.data.profile.name,
      email : regData.data.profile.email,
      mobile : regData.data.profile.mobileNumber
    }));

    dispatch(setPopup(true,"Registered Successfully","success"));
  } 
  else {
    dispatch(setPopup(true,regData.data,"error"));
  }
}