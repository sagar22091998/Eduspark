import React, { Component , Fragment } from 'react';
import Showcase from '../../SubComponents/Showcase/Showcase';
import CoursesGrids from '../../SubComponents/CoursesGrids/CoursesGrids';
import { returnToTop } from '../../../utils/utilityFunctions'; 

class Home extends Component{

  componentDidMount(){
    returnToTop();
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