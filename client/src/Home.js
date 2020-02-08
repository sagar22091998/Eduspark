import React, { Component } from 'react';
import Showcase from './Showcase';
import Footer from './Footer';
import Grids from './Grids';
import Nav from "./Nav";

class Home extends Component{

  componentDidMount(){
    window.scrollTo(0,0);
  }


  render(){
    return(
      <div className="Home">
        <Nav current="Home"/>
        <Showcase/>
        <Grids/>
        <Footer/>
      </div>     
    );
  }
}

export default Home;