import React, { Component } from 'react';
import Footer from './Footer';
import Nav from "./Nav";
import { getProfile, instructorCourses, studentCourses } from './userFunctions'
import "./Profiles.css"
import axios from 'axios';

class Profiles extends Component{

  constructor(props){
    super(props);
    this.state={
      name:"",
      email: "",
      profileType: "",
      courseName : "",
      desc : "",
      courses : []
    }
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleChange(e){
    this.setState({[e.target.name] : e.target.value})
  }

  componentDidMount() {
    window.scrollTo(0,0);
    
    const token = localStorage.authToken
    getProfile(token).then(res => {
      this.setState({
        name: res.name,
        email: res.email,
        profileType: res.profileType
      });
      if(res.profileType === "instructor"){
        instructorCourses(token).then(response => {
          console.log(response)
          this.setState({
            courses : response
          });
          
        })
      }else if(res.profileType === "student"){
        studentCourses(token).then(response => {
          console.log(response)
          this.setState({
            courses: response
          })
        })
      }
    })
  }

  handleSubmit(e){

    e.preventDefault();
    const payload ={
      name: this.state.courseName,
      description: this.state.desc
    }

    const token = localStorage.authToken
    axios({
      url: '/courses',
      method: 'POST',
      data: payload,
      headers: {Authorization: `Bearer ${token}`}
    }).then(() => {
      const token = localStorage.authToken
      instructorCourses(token).then(response => {
        console.log(response)
        this.setState({
          courses : response
        }); 
      });
    })
  }

  render(){

    let type ;
    if(this.state.profileType==="instructor")
      type=true;
    else if(this.state.profileType==="student")
      type=false;

    let typeClass ;
    let typeHTML = 
    <div className="Profiles-Add">
      <h1 className="m-heading">Add Course</h1>
      <form className="Add-Form" onSubmit={this.handleSubmit}>
        <label htmlFor="Cname">Name</label>
        <input 
          type="text" 
          placeholder="Enter Course Name"
          value={this.state.courseName}
          name="courseName" 
          id="Cname"
          onChange={this.handleChange}/>
        <label htmlFor="ta">Description</label>
        <textarea 
          className = "TA"
          name="desc"  
          placeholder="Enter Description" 
          id="ta"
          value={this.state.desc}
          onChange={this.handleChange}></textarea>
        <input disabled={this.state.courseName===""} className = "btn" type="submit" value="Add"/>
      </form>
    </div> ;

    if(type){
      typeClass = "Profiles-Details Instructor"  
    }
    else{
      typeClass = "Profiles-Details Student"    
    }
    return(
      <div className="Profiles">
        <Nav current="Profiles"/>
        <div className={typeClass}>
          <div className="Overlay"> 
            <h1 className="l-heading">Hello ,{type?"Instructor": "Student"}</h1>
            <h2 className="m-heading">Your Details</h2>
            <p>Name :- {this.state.name}</p>
            <p>Email :- {this.state.email}</p>
          </div>
          <div className={type?"Profiles-Manage p-1":"Profiles-Your p-1"}>
            <h1 className="m-heading">{type ? "Manage Courses" :"Your Courses"}</h1>
          {this.state.courses.map((x)=><p>{x.name}</p>)}
          </div>
          {type&&typeHTML}
        </div>
        <Footer/>
      </div>     
    );
  }
}

export default Profiles;