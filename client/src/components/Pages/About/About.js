import React, { Component } from 'react';
import { returnToTop } from '../../../utils/utilityFunctions';
import Creators from "../../SubComponents/Creators/Creators";
import "./About.scss";

class About extends Component{
  
  componentDidMount() {
    returnToTop();
  }

  render(){
    return(
      <div className="about">
        <div className="about__main">
          <div className="about__main__container">
            <h1 className="about__main__container--head ">About Us!!</h1>
            <p className="about__main__container--text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, explicabo neque fugit quam, optio hic impedit, magni veritatis officiis repudiandae nihil minus facere tempore ducimus rem perspiciatis corporis quo corrupti?</p>
    
            <p className="about__main__container--text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati . Sunt officia placeat maxime quas error, praesentium eos delectus. Dolorem nesciunt error nostrum iure dolore, culpa commodi! Iure nemo minus incidunt reprehenderit quam. Eum, corrupti atque. Molestiae, deserunt!</p>
          </div>
        </div>
        <Creators/>
      </div>
    );
  }
}

export default About;