import { SET_MESSAGE } from "./actionTypes" 

export const setPopup = ( status , text , popupType ) => ({ type : SET_MESSAGE , status , text , popupType })