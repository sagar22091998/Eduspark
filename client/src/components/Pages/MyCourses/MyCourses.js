import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./MyCourses.scss"
import { connect } from "react-redux"
import { setAddModal , getCoursesList } from "../../../actions/index"
import CourseStrip from "../../SubComponents/CourseStrip/CourseStrip"
import AddCourse from "../../SubComponents/AddCourse/AddCourse"
import DeleteModal from "../../SubComponents/DeleteModal/DeleteModal"
import EditDetails from "../../SubComponents/EditDetails/EditDetails"
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';

class MyCourses extends Component {

  componentDidMount() {
    returnToTop();
    this.props.getCoursesList();
  }

  render() {
    const { setAddModal , coursesList , coursesLoading } = this.props;

    return (
      <div className="courses">
        <div className="courses__container">
          <h1 className="courses__container--head">My Courses</h1>
          <button className="courses__container--add" onClick={()=>setAddModal(true)}>Add Your New Course</button>
          { 
            coursesLoading ? <h1>Tatti</h1> :
            coursesList.length === 0 ? 
            <p className="courses__container--empty">No Courses Added yet.</p>
              :
            <div className="courses__container--list">
              <h2 className="courses__container--list--head">Added Courses<AssignmentReturnedIcon/></h2>
              {coursesList.map( course => <CourseStrip key={course._id} title={course.name} desc={course.description} price={String(course.price)} courseId={course._id}/>)}
            </div>
          }
        </div>
        <AddCourse/>
        <DeleteModal/> 
        <EditDetails/> 
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
    setAddModal : (status) => dispatch(setAddModal(status)),
    getCoursesList : () => dispatch(getCoursesList())    
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(MyCourses);