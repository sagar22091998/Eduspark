import React, { Component } from 'react';
import Footer from "./Footer";
import Creators from "./Creators";
import "./About.css";
import Nav from "./Nav";


class About extends Component{
  

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render(){
    return(
      <div className="About-Section">
        <Nav current="About"/>
        <div className="About-Main ">
          <div className="About-Content p-3">
            <h1 className="l-heading py-1">About Us!!</h1>
            <p className="m-text">LLorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, explicabo neque fugit quam, optio hic impedit, magni veritatis officiis repudiandae nihil minus facere tempore ducimus rem perspiciatis corporis quo corrupti?</p>
    
            <p className="m-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati . Sunt officia placeat maxime quas error, praesentium eos delectus. Dolorem nesciunt error nostrum iure dolore, culpa commodi! Iure nemo minus incidunt reprehenderit quam. Eum, corrupti atque. Molestiae, deserunt!</p>
          </div>
        </div>
        <Creators/>
        <Footer/>   
      </div>
    );
  }
}

export default About;