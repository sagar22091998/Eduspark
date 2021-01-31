import React, { Component , Fragment } from 'react';
import { Redirect, Route , Switch , withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { setSelectedPage , logoutHandler , setLoginStatus , getProfile , getAllCoursesList } from "../../actions/index"
import MediaQuery from 'react-responsive'
import Home from "../Pages/Home/Home";
import LoginRegister from "../Pages/LoginRegister/LoginRegister"
import About from "../Pages/About/About"
import Navbar from '../SubComponents/HeaderFooters/Navbar/Navbar';
import Footer from '../SubComponents/HeaderFooters/Footer/Footer';
import Profile from '../Pages/Profile/Profile';
import MobileNavbar from "../SubComponents/HeaderFooters/MobileNavbar/MobileNavbar";
import MyCourses from '../Pages/MyCourses/MyCourses';
import CourseDetails from '../Pages/CourseDetails/CourseDetails';
import MyQuizes from '../Pages/MyQuizes/MyQuizes';
import QuizDetails from '../Pages/QuizDetails/QuizDetails';
import MySubscriptions from '../Pages/MySubscriptions/MySubscriptions';
import SubscriptionDetails from '../Pages/SubscriptionDetails/SubscriptionDetails';

class MainRouter extends Component {

  componentDidMount(){
    
    const { setSelectedPage , history , logoutHandler , setLoginStatus , getProfile , getAllCoursesList } = this.props;

    //For Navbar Links
    const selectedPage = history.location.pathname.split("/")[1];
    setSelectedPage(selectedPage)

    this.pageSelector = history.listen((location) => {
      const selectedPage = location.pathname.split("/")[1];
      setSelectedPage(selectedPage)
    });

    // Login / Logout
    
    // Not Logged in list
    getAllCoursesList()
    
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    //Logged in
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setLoginStatus(true);
    getProfile();

    //Logged In List
    getAllCoursesList()

    setTimeout(() => {
      logoutHandler();
    }, remainingMilliseconds);

  }
  
  componentWillUnmount(){
    this.pageSelector();
  }

  render(){
    const { isLoggedIn } = this.props;

      return (
        <Fragment>
          <MediaQuery minWidth={550}>
            <Navbar/>
          </MediaQuery>
          <MediaQuery maxWidth={551}>
            <MobileNavbar/>
          </MediaQuery>
          <Switch>
            <Route exact path="/" component={ Home }/>
            <Route  path="/about" component={ About }/>
            {!isLoggedIn && <Route path="/user" component={ LoginRegister }/> }
            {isLoggedIn && <Route path="/profile" component={ Profile }/>}
            {isLoggedIn && <Route path="/mycourses" component={ MyCourses }/>}
            {isLoggedIn && <Route exact path="/course/:courseID/quizes/:quizNumber" component={ QuizDetails }/>}
            {isLoggedIn && <Route exact path="/course/:courseID/quizes" component={ MyQuizes }/>}
            {isLoggedIn && <Route exact path="/course/:courseID" component={ CourseDetails }/>}
            {isLoggedIn && <Route path="/mysubscriptions" component={ MySubscriptions }/>}
            {isLoggedIn && <Route path="/subscription/:courseID" component={ SubscriptionDetails }/>}
            <Redirect to="/" />
          </Switch>
          <Footer/>
        </Fragment>
      );
  }
}

const mapStatesToProps = (state) => { 
  return {
    isLoggedIn : state.auth.isLoggedIn
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setSelectedPage : (page) => dispatch(setSelectedPage(page)),
    setLoginStatus : (status) => dispatch(setLoginStatus(status)),
    logoutHandler : () => dispatch(logoutHandler()),
    getProfile : () => dispatch(getProfile()),
    getAllCoursesList : () => dispatch(getAllCoursesList())
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(withRouter(MainRouter));