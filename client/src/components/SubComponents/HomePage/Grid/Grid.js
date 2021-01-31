import React, { Component } from 'react';

import { connect } from "react-redux"
import { Link , withRouter } from 'react-router-dom';
import { setPopup , payment } from "../../../../actions/index"
import "./Grid.scss"

class Grid extends Component{

  purchaseHandler = () => {
    const { isLoggedIn , setPopup , courseDetails , payment , history } = this.props
    
    if(!isLoggedIn){
      setPopup(true,"Login First","warning");
      return;
    }    

    payment(courseDetails._id , history);
  }

  render(){
    const { name , desc , price , isInstructor , isPurchased , _id } = this.props.courseDetails;

    return(
      <div className="grid">
        <div className="grid__front">
          <div className="grid__front--overlay">
            <h3>{name}</h3>
            <p>Tap for More</p>
          </div>
        </div>
        <div className="grid__back">
          <div className="grid__back--content">
            <p className="grid__back--content--desc">{desc}</p>
            <p className="grid__back--content--price">₹{price}.00</p>
            { isInstructor === 1 ? 
              <Link to={`/course/${_id}`}><button>Edit Course</button></Link> :
              ( 
                isPurchased === 1 ? 
                <Link to={`/subscription/${_id}`}><button>Learn Now</button></Link> :
                <button onClick={this.purchaseHandler}>Buy Now</button>
              ) 
            }
          </div>
        </div>
      </div>    
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
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),    
    payment : (courseId,history) => dispatch(payment(courseId,history))    
  }
}

export default withRouter(connect(mapStatesToProps,mapDispatchToProps)(Grid));