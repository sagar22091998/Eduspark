import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./MyCourses.scss"
import { connect } from "react-redux"
import { } from "../../../actions/index"

// background: linear-gradient(90deg, rgba(23,97,160,1) 13%, rgba(37,41,46,1) 65%);
class MyCourses extends Component {

  componentDidMount() {
    returnToTop();
  }

  render() {
    return (
      <div className="courses">
        <div className="courses__container">
          <h1 className="courses__container--head">My Courses</h1>
          <button className="courses__container--add">Add Your New Course</button>
          {true ? 
          <p className="courses__container--empty">No Courses Added</p>
            :
          <div className="courses__container--list">


          </div>
          }
        </div> 
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    selectedPage : state.auth.selectedPage,
    isLoggedIn : state.auth.isLoggedIn,
    changeModal : state.profile.changeModal,
    mobileDropdown : state.common.mobileDropdown,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setLoginStatus : (status) => dispatch(setLoginStatus(status)),
    setMobileDropdown : (status) => dispatch(setMobileDropdown(status)),
    logoutHandler : () => dispatch(logoutHandler())
    
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(MyCourses);