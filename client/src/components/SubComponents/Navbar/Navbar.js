import React, { Component , Fragment} from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { logoutHandler , setPopup , setLoginStatus } from "../../../actions/index"
import "./Navbar.scss"
import MessagePopup from "../MessagePopup/MessagePopup"
import ChangePasswordModal from "../../SubComponents/ChangePasswordModal/ChangePasswordModal"

class Navbar extends Component{

  render(){
    const { selectedPage , logoutHandler , isLoggedIn , changeModal } = this.props;
  
    return(
      <div className="navbar">
        <Link to="/">
          <div className="navbar__logo"></div>
        </Link>
        <ul className="navbar__links">
          <Link to="/"><li className={selectedPage==="" ? "activePage" : ""}>Home</li></Link>
          <Link to="/about"><li className={selectedPage==="about" ? "activePage" : ""}>About</li></Link>
          { !isLoggedIn ?
            <Link to="/user/login"><li className={selectedPage==="user" ? "activePage" : ""}>Login | Register</li></Link>
            :
            <Fragment>
              <Link to="/profile"><li className={selectedPage==="profile" ? "activePage" : ""}>Profile</li></Link>
              <li onClick={logoutHandler}>Logout</li>
              <li>My Courses</li>
              <li>Subscriptions</li>
            </Fragment>
            }
        </ul>
        <ChangePasswordModal/>
        { !changeModal && <MessagePopup />}
      </div>
    );
  }

}

const mapStatesToProps = (state) => { 
  return {
    selectedPage : state.auth.selectedPage,
    isLoggedIn : state.auth.isLoggedIn,
    changeModal : state.profile.changeModal
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setLoginStatus : (status) => dispatch(setLoginStatus(status)),
    logoutHandler : () => dispatch(logoutHandler())
    
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(Navbar);

