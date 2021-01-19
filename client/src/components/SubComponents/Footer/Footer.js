import React, { Component } from 'react';
import { Link }  from "react-router-dom";
import "./Footer.scss"

class Footer extends Component{
  render(){
    return(
      <div className="footer">
        <div className="footer__main">
          <div 
            className="footer__main--links"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-once="true"
          >
            <Link className="footer__main--links--link" to="/">Home</Link>
            <Link className="footer__main--links--link" to="/about">About Us</Link>
          </div>
          <div 
            className="footer__main--socials"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-once="true">
            <a href="http://facebook.com" rel="noopener noreferrer" target="_blank" ><i className="fab fa-facebook fa-2x  "></i></a>
            <a href="http://twitter.com" rel="noopener noreferrer" target="_blank" ><i className="fab fa-twitter fa-2x "></i></a>
            <a href="http://instagram.com" rel="noopener noreferrer" target="_blank" ><i className="fab fa-instagram fa-2x "></i></a>
            <a href="http://youtube.com" rel="noopener noreferrer" target="_blank" ><i className="fab fa-youtube fa-2x "></i></a>
          </div>
        </div>
        <p className="footer__sec">EduSpark Copyright &copy; 2020 , All Rights Reserved</p>
     </div>
    );
  }
}

export default Footer;