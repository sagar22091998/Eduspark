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
      profileType : "None",
      myCourses: []
    }
    this.addCourse = this.addCourse.bind(this); 
  }

  addCourse(){
    const token = localStorage.authToken;
    const id = this.props.location.state.id;
    axios({
      url: `/addCourses/${id}`,
      method: 'POST',
      headers: {Authorization: `Bearer ${token}`}
    }).then((res) => {
      console.log(res.data);
      this.props.history.push('/profile');
    })
  }

  componentDidMount(){
    window.scrollTo(0,0);
    if(localStorage.authToken!==undefined){
      const token = localStorage.authToken;
      getProfile(token).then(res => {
        this.setState({ 
          profileType: res.profileType,
          myCourses: res.myCourses
        });
        const id = this.props.location.state.id;
        if(this.state.myCourses.includes(id)){
          console.log('Course already added');
        }
      });
    }
  }

  render(){

    let msg;
    if(localStorage.authToken===undefined){
        msg=<p className="Message">Login To Add Courses.</p>
      }
    else if(this.state.profileType==="instructor"){
        msg=<p className="Message">Login As Student To Add Courses.</p>
    }
    else if(this.state.myCourses.includes(this.props.location.state.id)){
        msg=<p className="Message">Already Subscribed.</p>
    }
    else
        msg=<button className="btn" onClick={this.addCourse}>Add This Course Now</button>

    return(
      <div className="Courses">
        <Nav current=""/>
        <div className="Courses-Head">
          <h1 className="m-heading py-2">{this.props.location.state.name}</h1>
          { msg }
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