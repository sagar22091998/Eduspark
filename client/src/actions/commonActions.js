import { SET_MESSAGE , SET_MOBILE_NAVBAR } from "./actionTypes" 

export const setPopup = ( status , text , popupType ) => ({ type : SET_MESSAGE , status , text , popupType })

export const setMobileDropdown = (status) => ({ type : SET_MOBILE_NAVBAR , status })