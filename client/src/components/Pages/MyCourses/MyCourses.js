import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./MyCourses.scss"
import { connect } from "react-redux"
import { setAddModal , getCoursesList , setDeleteModal , setEditModal } from "../../../actions/index"
import CourseStrip from "../../SubComponents/InstructorCoursesPage/CourseStrip/CourseStrip"
import AddCourse from "../../SubComponents/InstructorCoursesPage/AddCourse/AddCourse"
import DeleteModal from "../../SubComponents/DeleteModal/DeleteModal"
import EditDetails from "../../SubComponents/InstructorCoursesPage/EditDetails/EditDetails"
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import CircularProgress from '@material-ui/core/CircularProgress';

class MyCourses extends Component {

  componentDidMount() {
    returnToTop();
    this.props.getCoursesList();
  }

  componentWillUnmount(){
    const { setEditModal , setDeleteModal , setAddModal } = this.props;
  
    setEditModal(false);
    setDeleteModal(false);
    setAddModal(false);
  }

  render() {
    const { setAddModal , coursesList , coursesLoading } = this.props;

    return (
      <div className="courses">
        <div className="courses__container">
          <h1 className="courses__container--head">My Courses</h1>
          <button className="courses__container--add" onClick={()=>setAddModal(true)}>Add Your New Course</button>
          { 
            coursesLoading ? <div className = "courses__container--loading" ><CircularProgress size={200}/></div> :
            (coursesList.length === 0 ? 
            <p className="courses__container--empty">No Courses Added yet.</p>
              :
            <div className="courses__container--list">
              <h2 className="courses__container--list--head">Added Courses<AssignmentReturnedIcon/></h2>
              {coursesList.map( course => <CourseStrip key={course._id} title={course.name} desc={course.description} price={String(course.price)} courseId={course._id}/>)}
            </div>)
          }
        </div>
        <AddCourse/>
        <DeleteModal deleteType="COURSE"/> 
        <EditDetails/> 
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    coursesList : state.courses.coursesList,
    coursesLoading : state.courses.coursesLoading
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setAddModal : (status) => dispatch(setAddModal(status)),
    setEditModal : (status,oldDetails) => dispatch(setEditModal(status,oldDetails)),
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
    getCoursesList : () => dispatch(getCoursesList()) 
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(MyCourses);