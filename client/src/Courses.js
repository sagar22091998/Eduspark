import React, { Component } from 'react';
import Footer from "./Footer";
import "./Courses.css"


class Courses extends Component{

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <div className="Courses">
        <h1 className="l-heading py-2">Welcome to Course</h1>
        <div className="Courses-Content">
          <div className="Courses-Text">{this.props.location.state.name}</div>
          <div className="Courses-Image1"></div>
          <div className="Courses-Image2"></div>
          <div className="Courses-Text">{this.props.location.state.desc}</div>
        </div>
        <Footer/>
      </div>     
    );
  }
}

export default Courses;