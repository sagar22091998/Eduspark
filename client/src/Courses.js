import React, { Component } from 'react';
import Footer from "./Footer";
import Nav from "./Nav";
import "./Courses.css"
import axios from 'axios'
import { getProfile } from './userFunctions'

class Courses extends Component{

  constructor(props){
    super(props);
    this.state={
      profileType : "None"
    }
  }

  addCourse= ()=> {
    const token = localStorage.authToken
    const id = this.props.location.state.id
    console.log(id)
    axios({
      url: `/addCourses/${id}`,
      method: 'POST',
      headers: {Authorization: `Bearer ${token}`}
    }).then((res) => {
      console.log(res.data)
      this.props.history.push('/profile')
    })
  }

  componentDidMount(){
    window.scrollTo(0,0);
    if(localStorage.authToken!==undefined){
      const token = localStorage.authToken;
      getProfile(token).then(res => {
        this.setState({ profileType: res.profileType});
      });
    }
  }

  render(){
    return(
      <div className="Courses">
        <Nav current=""/>
        <div className="Courses-Head">
          <h1 className="m-heading py-2">{this.props.location.state.name}</h1>
          { localStorage.authToken===undefined 
          ?"Login To Add Courses"
          :(
            this.state.profileType==="instructor"?
            "Login As Student To Add Courses":
            <button className="btn" onClick={this.addCourse}>Add This Course Now</button>)
          }
        </div>
        <div className="Courses-Content">
          <div className="Courses-Text text-primary p-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor doloremque, debitis nesciunt, enim deleniti sequi esse pariatur et, distinctio ab quod modi! </div>
          <div className="Courses-Image1"></div>
          <div className="Courses-Image2"></div>
          <div className="Courses-Text text-primary p-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor doloremque, debitis nesciunt, enim deleniti sequi esse pariatur et, distinctio ab quod modi! </div>
        </div>
        <Footer/>
      </div>     
    );
  }
}

export default Courses;