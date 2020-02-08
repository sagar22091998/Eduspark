import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Footer.css"

class Footer extends Component{
  render(){
    return(
      <footer className="Footer">
        <div className="Footer-Content">
          <div className="Footer-Main p-1">
            <div 
              className="Footer-Links"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-once="true"
            >
              <Link className="Footer-Link" to="/">Home</Link>
              <Link className="Footer-Link" to="/about">About Us</Link>
            </div>
            <div 
              className="Footer-Social"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-once="true">
              <a href="http://facebook.com" rel="noopener noreferrer" target="_blank" ><i className="fab fa-facebook fa-2x text-black "></i></a>
              <a href="http://twitter.com" rel="noopener noreferrer" target="_blank" ><i className="fab fa-twitter fa-2x text-black"></i></a>
              <a href="http://instagram.com" rel="noopener noreferrer" target="_blank" ><i className="fab fa-instagram fa-2x text-black"></i></a>
              <a href="http://youtube.com" rel="noopener noreferrer" target="_blank" ><i className="fab fa-youtube fa-2x text-black"></i></a>
            </div>
          </div>
          <p className="Footer-Sec p-2">EduSpark Copyright &copy; 2020 , All Rights Reserved</p>
        </div>
     </footer>
    );
  }
}

export default Footer;