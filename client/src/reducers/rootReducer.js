import { combineReducers } from "redux"
import authReducer from "./authReducer"
import commonReducer from "./commonReducer"
import profileReducer from "./profileReducer.js"

const rootReducer = combineReducers({
  auth : authReducer,
  common : commonReducer,
  profile : profileReducer
})

export default rootReducer;