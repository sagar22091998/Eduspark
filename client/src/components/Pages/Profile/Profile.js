import React, { Component } from 'react';
import ProfileDetails from "../../SubComponents/ProfilePage/ProfileDetails/ProfileDetails";
import "./Profile.scss"
import profile from "../../../images/profile.png"
import { returnToTop } from '../../../utils/utilityFunctions'; 

class Profile extends Component {
  
  componentDidMount(){
    returnToTop();
  }

  render(){
    return (
      <div className="profile">
        <div className="profile__container">
          <h1 className="profile__container__head">Profile</h1>      
          <div className="profile__container__main">
            <ProfileDetails/>
            <div className="profile__container__main--img">
              <img src = {profile} alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;