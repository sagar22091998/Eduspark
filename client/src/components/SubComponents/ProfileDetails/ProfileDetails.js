import React, { Component } from 'react'
import "./ProfileDetails.scss"
import EditIcon from '@material-ui/icons/Edit';

class ProfileDetails extends Component {
  
  render(){
    return (
      <div className="details">
        <div className="details__fields">
          <p className="details__fields--label">Name</p>
          <div className="details__fields--text">
            <input type="text" name="profileName"/>
            <div className="details__fields--text--img">
              <EditIcon/>
            </div>
          </div>
        </div>
        <div className="details__fields">
          <p className="details__fields--label">Email</p>
          <div className="details__fields--text">
            <input type="text" name="profileEmail"/>
            <div className="details__fields--text--img">
              <EditIcon/>
            </div>
          </div>
        </div>
        <div className="details__fields">
          <p className="details__fields--label">Phone</p>
          <div className="details__fields--text">
            <input type="text" name="profilePhone"/>
            <div className="details__fields--text--img">
              <EditIcon/>
            </div>
          </div>
        </div>
        <div className="details__btns">
          <button className="details__btns--reset">Reset Password</button>
          <button className="details__btns--update"> Update</button>
        </div>
      </div>
    )
  }
}

export default ProfileDetails;