import { combineReducers } from "redux"
import authReducer from "./authReducer"
import commonReducer from "./commonReducer"
import profileReducer from "./profileReducer.js"
import coursesReducer from "./coursesReducer.js"
import coursesDetailsReducer from "./coursesDetailsReducer.js"

const rootReducer = combineReducers({
  auth : authReducer,
  common : commonReducer,
  profile : profileReducer,
  courses : coursesReducer,
  details : coursesDetailsReducer
})

export default rootReducer;