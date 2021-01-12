import React, { Component , Fragment } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logoutHandler , setPopup , setLoginStatus , setMobileDropdown } from "../../../actions/index"
import "./MobileNavbar.scss"
import MessagePopup from "../MessagePopup/MessagePopup"
import ChangePasswordModal from "../../SubComponents/ChangePasswordModal/ChangePasswordModal"

//Material UI
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

class MobileNavbar extends Component {

  render() {
    const { selectedPage , logoutHandler , isLoggedIn , changeModal , mobileDropdown , setMobileDropdown } = this.props;

    return (
      <div className="mobnav">
        <div className="mobnav__main">
          <MenuIcon className="mobnav__main--menuicon" onClick={() => { setMobileDropdown(!mobileDropdown)}}/>
          <Link to="/" onClick={() => { setMobileDropdown(false)}}><div className="mobnav__main--logo"></div></Link>
        </div>
        <ul className={ mobileDropdown ? "mobnav__menu menu--open" : "mobnav__menu" }>
          <CloseIcon onClick={() => { setMobileDropdown(false)}}/>
          <Link to="/" onClick={() => { setMobileDropdown(false)}}><li className={selectedPage === "" ? "activePage" : ""}>Home</li></Link>
          <Link to="/about" onClick={() => { setMobileDropdown(false)}}><li className={selectedPage==="about" ? "activePage" : ""}>About</li></Link>
          {!isLoggedIn ?
            <Link to="/user/login" onClick={() => { setMobileDropdown(false)}}><li className={selectedPage==="user" ? "activePage" : ""}>Login | Register</li></Link>
            :
            <Fragment>
              <Link to="/profile" onClick={() => { setMobileDropdown(false)}}><li className={selectedPage==="profile" ? "activePage" : ""}>Profile</li></Link>
              <li onClick={() => { 
                // setMobileDropdown(false)
                logoutHandler()
              }}>Logout</li>
              <li onClick={() => { setMobileDropdown(false)}}>My Courses</li>
              <li onClick={() => { setMobileDropdown(false)}}>Subscriptions</li>
            </Fragment>
          }
        </ul>
        <ChangePasswordModal/>
        { !changeModal && <MessagePopup />}
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

export default connect( mapStatesToProps , mapDispatchToProps )(MobileNavbar);