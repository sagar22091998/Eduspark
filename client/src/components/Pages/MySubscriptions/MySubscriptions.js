import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./MySubscriptions.scss"
import { connect } from "react-redux"
import { getSubscriptionsList } from "../../../actions/index"
import SubscriptionStrip from "../../SubComponents/SubscriptionsComponents/SubscriptionStrip/SubscriptionStrip"
import CircularProgress from '@material-ui/core/CircularProgress';

class MySubscriptions extends Component {

  componentDidMount() {
    returnToTop()
    this.props.getSubscriptionsList();
  }


  render() {
    const { subscriptionsList , subscriptionsLoading } = this.props;
  
    return (
      <div className="subs">
        <div className="subs__container">
          <h1 className="subs__container--head">Your Subscriptions</h1>
          { 
            subscriptionsLoading ? <div className = "subs__container--loading" ><CircularProgress size={200}/></div> :
            (subscriptionsList.length === 0 ? 
            <p className="subs__container--empty">No Courses Subscribed yet.</p>
              :
            <div className="subs__container--list">
              {subscriptionsList.map( sub => <SubscriptionStrip key={sub.courseId._id} title={sub.courseId.name} courseId={sub.courseId._id}/>)}
            </div>)
          }
        </div>
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    subscriptionsList : state.student.subscriptionsList,
    subscriptionsLoading : state.student.subscriptionsLoading
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    getSubscriptionsList : () => dispatch(getSubscriptionsList())    
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(MySubscriptions);