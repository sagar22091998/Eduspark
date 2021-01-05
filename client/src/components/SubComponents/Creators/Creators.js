import React, { Component } from 'react';
import man from "../../../images/man.jpg";
import woman from "../../../images/woman.jpg";
import "./Creators.scss"

class Creators extends Component{
  render(){
    return(
      <div className="creators">
        <h1 className="creators__heading">Meet Our Team</h1>
        <div className="creators__images">
          <div className="creators__images--img" 
            data-aos="slide-right"
            data-aos-offset="250"
            data-aos-duration="1000"
            data-aos-once="true">
            <h2>Moussa Sissoko</h2>
            <img alt="Image1" src={man}/>
          </div>
          <div className="creators__images--img" 
            data-aos="slide-left"
            data-aos-offset="250"
            data-aos-duration="1000"
            data-aos-once="true">
            <h2>Britney Spears</h2>
            <img alt="Image2" src={woman}/>
          </div>
        </div>
      </div>     
    );
  }
}

export default Creators;