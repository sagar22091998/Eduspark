import React, { Component } from 'react';
import img1 from "./man.jpg";
import img2 from "./woman.jpg";
import "./Creators.css"
class Creators extends Component{
  render(){
    return(
      <div className="Creators">
        <h1 className="m-heading py-2">Meet Our Team</h1>
        <div className="Image-Container">
          <div className="Images" 
            data-aos="slide-right"
            data-aos-offset="200"
            data-aos-duration="1000"
            data-aos-once="true">
            <h3>Moussa Sissoko</h3>
            <img alt="Image1" src={img1}/>
          </div>
          <div className="Images" 
            data-aos="slide-left"
            data-aos-offset="200"
            data-aos-duration="1000"
            data-aos-once="true">
            <h3>Britney Spears</h3>
            <img alt="Image2" src={img2}/>
          </div>
        </div>
      </div>     
    );
  }
}

export default Creators;