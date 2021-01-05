import React, { Component , Fragment } from 'react';
import Showcase from '../../SubComponents/Showcase/Showcase';
import CoursesGrids from '../../SubComponents/CoursesGrids/CoursesGrids';

class Home extends Component{

  componentDidMount(){
    window.scrollTo(0,0);
  }

  render(){
    return(
      <Fragment>
        <Showcase/>
        <CoursesGrids/>
      </Fragment>
    );
  }
}

export default Home;