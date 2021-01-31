import React, { Component } from 'react';
import "./SubscriptionStrip.scss";
import { Link } from "react-router-dom";

class SubscriptionStrip extends Component{
  render(){
    const { title , courseId } = this.props;

    return(
      <Link className="subsstrip" to={`/subscription/${courseId}`}><p className="subsstrip--text">{title}</p></Link> 
    );
  }
}

export default SubscriptionStrip;