import React, { Component } from 'react';
import Footer from "./Footer";
import Nav from "./Nav";
import "./Error404.css"
class Error404 extends Component{

  componentDidMount(){
    window.scrollTo(0,0);
  }


  render(){
    return(
      <div className="Error404">
        <Nav current=""/>
        <div className="Error-Main"></div>
        <Footer/>
      </div>     
    );
  }
}

export default Error404;