import { combineReducers } from "redux"
import authReducer from "./authReducer"
import commonReducer from "./commonReducer"
import profileReducer from "./profileReducer.js"
import coursesReducer from "./coursesReducer.js"
import coursesDetailsReducer from "./coursesDetailsReducer.js"
import quizesReducer from "./quizesReducer.js"
import quizDetailsReducer from "./quizDetailsReducer"

const rootReducer = combineReducers({
  auth : authReducer,
  common : commonReducer,
  profile : profileReducer,
  courses : coursesReducer,
  quizes : quizesReducer,
  details : coursesDetailsReducer,
  quizdetails : quizDetailsReducer
})

export default rootReducer;