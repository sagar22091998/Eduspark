import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./CourseDetails.scss"
import { connect } from "react-redux"
import { setAddModal , getCoursesList } from "../../../actions/index"

class CourseDetails extends Component {

  componentDidMount() {
    returnToTop();
    // this.props.getCoursesList();
  }

  render() {
    const {} = this.props;

    return (
      <div className="details">
        
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    coursesList : state.courses.coursesList,
    coursesLoading : state.courses.coursesLoading,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    // getCoursesList : () => dispatch(getCoursesList()),
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(CourseDetails);