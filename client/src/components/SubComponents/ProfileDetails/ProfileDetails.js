import React, { Component } from 'react'
import { connect } from "react-redux"
import { setProfileFields , editProfileFields , updateProfile , setPopup , setChangeModal } from "../../../actions/index"
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal'
import { isEmpty } from "../../../utils/validators"
import isEmail from "validator/es/lib/isEmail"
import isMobilePhone from "validator/es/lib/isMobilePhone"
import "./ProfileDetails.scss"
import EditIcon from '@material-ui/icons/Edit'; 

class ProfileDetails extends Component {
  
  handleProfileFields = (e) =>{
    this.props.setProfileFields(e.target.name,e.target.value)
  }

  handleUpdate = () => {
    const { newName , newEmail , newMobile , updateProfile , setPopup } = this.props;

    if(isEmpty({ newName , newEmail , newMobile })){
      setPopup(true,"Fields cannot be empty","error")
      return;
    }  
    
    if(!isEmail(newEmail)){
      setPopup(true,"Invalid email","error")
      return;
    }

    if(!isMobilePhone(newMobile) || newMobile.length !== 10){
      setPopup(true,"Invalid new mobile number","error")
      return;
    }

    updateProfile({newName , newEmail , newMobile});
  }

  render(){
    const { profileName , profileEmail , profileMobile , newName , newEmail , newMobile , editName , editMobile , editEmail , editProfileFields , setChangeModal } = this.props;

    return (
      <div className="details">
        <div className="details__fields">
          <p className="details__fields--label">Name</p>
          <div className="details__fields--text">
            <input type="text" name="newName" disabled={!editName} value={ newName } onChange={this.handleProfileFields}/>
            <div className="details__fields--text--img" onClick={(e) => { editProfileFields("editName",!editName)}}>
              <EditIcon />
            </div>
          </div>
        </div>
        <div className="details__fields">
          <p className="details__fields--label">Email</p>
          <div className="details__fields--text">
            <input type="text" name="newEmail" disabled={!editEmail} value={ newEmail } onChange={this.handleProfileFields}/>
            <div className="details__fields--text--img" onClick={(e) => { editProfileFields("editEmail",!editEmail)}}>
              <EditIcon/>
            </div>
          </div>
        </div>
        <div className="details__fields">
          <p className="details__fields--label">Phone</p>
          <div className="details__fields--text">
            <input type="text" name="newMobile" disabled={!editMobile} value={ newMobile } onChange={this.handleProfileFields}/>
            <div className="details__fields--text--img" onClick={(e) => { editProfileFields("editMobile",!editMobile)}}>
              <EditIcon/>
            </div>
          </div>
        </div>
        <div className="details__btns">
          <button className="details__btns--reset" onClick={ () => setChangeModal(true) }>Change Password</button>
          <button className="details__btns--update" onClick={this.handleUpdate} disabled={ profileName=== newName && profileEmail=== newEmail && profileMobile=== newMobile }>Update</button>
        </div>
        <ChangePasswordModal/>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    profileName : state.profile.profileName ,
    profileEmail : state.profile.profileEmail ,
    profileMobile : state.profile.profileMobile ,
    newName : state.profile.newName ,
    newEmail : state.profile.newEmail ,
    newMobile : state.profile.newMobile,
    editMobile : state.profile.editMobile ,
    editEmail : state.profile.editEmail ,
    editName : state.profile.editName,
  }
} 

  const mapDispatchToProps = (dispatch) => { 
    return {
    setProfileFields : (name,value) => dispatch(setProfileFields(name,value)),
    editProfileFields : (name,status) => dispatch(editProfileFields(name,status)),
    setChangeModal : (status) => dispatch(setChangeModal(status)),
    updateProfile : (newDetails) => dispatch(updateProfile(newDetails)), setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(ProfileDetails);
