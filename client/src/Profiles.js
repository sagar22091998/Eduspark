import React, { Component } from 'react';
import Footer from './Footer';
import Nav from "./Nav";
import { getProfile } from './userFunctions'
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
      desc : ""
    }
    this.handleChange = this.handleChange.bind(this); 
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
    })
    
  }

  submit=(event)=> {
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
    }).then((res) => {
      console.log('Course created successfully!!')
      this.props.history.push('/')
    })

  }

  render(){

    let type ;
    if(this.state.profileType==="instructor")
      type=true;
    else if(this.state.profileType==="student")
      type=false;

    let typeClass ;
    if(type)
      typeClass = "Profiles-Details Instructor"
    else
      typeClass = "Profiles-Details Student"

    return(
      <div className="Profiles">
        <Nav/>
        <div className="Profiles-Main">
          <div className={typeClass}>
            <div className="Overlay"> 
              <h1 className="l-heading">Hello ,{type?"Instructor": "Student"}</h1>
              <h2 className="m-heading">Your Details</h2>
              <p>Name :- {this.state.name}</p>
              <p>Email :- {this.state.email}</p>
            </div>
            <div className="Profiles-Add p-1">
              <h1 className="m-heading">Add Course</h1>
              <form className="Form" onSubmit={this.submit}>
                <label htmlFor="Cname">Name</label>
                <input 
                  type="text" 
                  placeholder="Enter Course Name"
                  value={this.state.courseName}
                  name="courseName" 
                  id="Cname"
                  onChange={this.handleChange}/>
                <label htmlFor="ta">Email</label>
                <input 
                  type="textarea" 
                  placeholder="Enter Description" 
                  id="ta"
                  value={this.state.desc}
                  name="desc"
                  onChange={this.handleChange}
                />
                <input className = "btn" type="submit" value="Add"/>
              </form>
            </div>
            <div className="Profiles-Manage p-1">
              <p>write something good!!</p>
            </div>
          </div>
        </div>
        <Footer/>
      </div>     
    );
  }
}

export default Profiles;