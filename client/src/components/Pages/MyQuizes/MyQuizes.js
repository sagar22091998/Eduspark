import React, { Component } from 'react'
import { returnToTop } from '../../../utils/utilityFunctions';
import "./MyQuizes.scss"
import { connect } from "react-redux"
import { setQuizAddModal , getQuizesList , setEditQuizModal , setDeleteModal } from "../../../actions/index"
import QuizStrip from "../../SubComponents/InstructorQuizesPage/QuizStrip/QuizStrip"
import AddQuiz from "../../SubComponents/InstructorQuizesPage/AddQuiz/AddQuiz"
import DeleteModal from "../../SubComponents/DeleteModal/DeleteModal"
import EditQuizDetails from "../../SubComponents/InstructorQuizesPage/EditQuizDetails/EditQuizDetails"
import CircularProgress from '@material-ui/core/CircularProgress';

class MyQuizes extends Component {

  componentDidMount() {
    returnToTop()
    this.props.getQuizesList(this.props.match.params.courseID);
  }

  componentWillUnmount(){
    const { setEditQuizModal , setDeleteModal , setQuizAddModal } = this.props;
  
    setEditQuizModal(false);
    setDeleteModal(false);
    setQuizAddModal(false);
  }


  render() {
    const { setQuizAddModal , quizesList , quizesLoading , match } = this.props;

    const courseId = match.params.courseID;
  
    return (
      <div className="quizes">
        <div className="quizes__container">
          <h1 className="quizes__container--head">My Quizes</h1>
          <button className="quizes__container--add" onClick={()=> setQuizAddModal(true)}>Add Your New Quiz</button>
          { 
            quizesLoading ? <div className = "quizes__container--loading" ><CircularProgress size={200}/></div> :
            (quizesList.length === 0 ? 
            <p className="quizes__container--empty">No Quizes Added yet.</p>
              :
            <div className="quizes__container--list">
              <h2 className="quizes__container--list--head">Added Quizes</h2>
              {quizesList.map( quiz => <QuizStrip key={quiz.quizNumber} title={quiz.topic} desc={quiz.description} time={quiz.totalTime} courseId={courseId} quizNumber={quiz.quizNumber}/>)}
            </div>)
          }
        </div>
        <AddQuiz courseId={courseId}/>
        <DeleteModal courseId={courseId} deleteType="QUIZ"/> 
        <EditQuizDetails courseId={courseId}/> 
      </div>
    )
  }
}

const mapStatesToProps = (state) => { 
  return {
    quizesList : state.quizes.quizesList,
    quizesLoading : state.quizes.quizesLoading,
    selectedQuiz : state.quizes.selectedQuiz,
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setQuizAddModal : (status) => dispatch(setQuizAddModal(status)),
    setEditQuizModal : (status,oldDetails) => dispatch(setEditQuizModal(status,oldDetails)),
    setDeleteModal : (status) => dispatch(setDeleteModal(status)),
    getQuizesList : (courseId) => dispatch(getQuizesList(courseId))    
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(MyQuizes);