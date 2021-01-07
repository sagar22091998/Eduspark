import { SET_PROFILE_FIELDS , SET_PROFILE , SET_EDITABLE , SET_RESET_PASSWORD_MODAL } from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"
import { setPopup } from "./index"

export const setProfileFields = (name,value) => ({ type : SET_PROFILE_FIELDS , name , value })

export const editProfileFields = (name,status) => ({ type : SET_EDITABLE , name , status })

export const setChangeModal = (status) => ({ type : SET_RESET_PASSWORD_MODAL , status })

export const getProfile = () => async ( dispatch ) => {
  
  const token = localStorage.getItem('token'); 

  const res = await requestHandler("profile/me", {
    method:"GET",
    headers:{ 
      "Authorization" :`Bearer ${token}`,
      "Content-Type":"application/json"
    }
  })

  const userData = await res.json();

  if(res.status===200){
    dispatch(({ 
      type : SET_PROFILE , 
      name : userData.data.name,
      email : userData.data.email,
      mobile : userData.data.mobileNumber
    }));
  }
  else {
    console.log("Profile Not Found");
  }
}

export const updateProfile = (newDetails) => async ( dispatch ) => {
  
  const token = localStorage.getItem('token'); 
  const res = await requestHandler("profile/update", {
    method:"PUT",
    headers:{ 
      "Authorization" :`Bearer ${token}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      name : newDetails.newName,
      email : newDetails.newEmail,
      mobileNumber : newDetails.newMobile
    })
  })

  const resData = await res.json();

  if(res.status===200){
    dispatch(getProfile());
    dispatch(editProfileFields("editName",false));
    dispatch(editProfileFields("editEmail",false));
    dispatch(editProfileFields("editMobile",false));
    dispatch(setPopup(true,"Profile updated successfully","success"));
  } 
  else {
    dispatch(setPopup(true,resData.data,"error"));
  }
}

export const changePassword = (passwords) => async ( dispatch ) => {
  
  const token = localStorage.getItem('token'); 
  const res = await requestHandler("profile/change-password", {
    method:"PUT",
    headers:{ 
      "Authorization" :`Bearer ${token}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      oldPassword : passwords.oldPass,
      newPassword : passwords.newPass
    })
  })

  if(res.status===200){
    dispatch(setChangeModal(false));
    dispatch(setProfileFields("oldPass",""));
    dispatch(setProfileFields("newPass",""));
    dispatch(setProfileFields("confirmPass",""));
    dispatch(setPopup(true,"Password updated successfully","success"));
  } 
  else {
    dispatch(setPopup(true,"Old password incorrect","error"));
  }
}