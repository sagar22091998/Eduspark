import React, { Component } from 'react';
import Footer from "./Footer";
import "./Courses.css"
import axios from 'axios'

class Courses extends Component{

  addCourse= ()=> {
    const token = localStorage.authToken
    const id = this.props.location.state.id
    console.log(id)
    axios({
      url: `/addCourses/${id}`,
      method: 'POST',
      headers: {Authorization: `Bearer ${token}`}
    }).then((res) => {
      console.log('Course added successfully')
      console.log(res)
    })
  }

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
          <button onClick={this.addCourse}>Add Now</button>
        </div>
        <Footer/>
      </div>     
    );
  }
}

export default Courses;