import React, { Component } from 'react'
import { connect } from "react-redux"
import { setPopup , setDetailFields , setUploadStaus , addVideo } from "../../../../actions/index"
import { isEmpty } from "../../../../utils/validators"
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import "./UploadWidget.scss"

class UploadWidget extends Component {

  componentDidMount(){
    const { setUploadStaus } = this.props;

    // Cloudinary Widget
    document.getElementById("upload_widget_opener").addEventListener("click", () => {
      this.widget = window.cloudinary.openUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDINARY_DATABASE,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
        sources: [
          "local",
          "google_drive",
          "instagram",
          "dropbox",
          "facebook"
      ],      
      showAdvancedOptions: false,
      cropping: false,
      multiple: false,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#F5F5F5",
          sourceBg: "#FFFFFF",
          windowBorder: "#90a0b3",
          tabIcon: "#0094c7",
          inactiveTabIcon: "#69778A",
          menuIcons: "#0094C7",
          link: "#53ad9d",
          action: "#8F5DA5",
          inProgress: "#0194c7",
          complete: "#53ad9d",
          error: "#c43737",
          textDark: "#000000",
          textLight: "#FFFFFF"
        },
        fonts: {
          default: null,
          "'Poppins', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Poppins",
            active: true
          }
        }
      }
    },
    (error , result) => { 

      if(result.event === 'success'){
        setUploadStaus(true,result.info.secure_url);
      }
      });
    });
  }

  showWidget = () => this.widget.open();

  handleVideoAddition = () => {
    const { videoTitle , setPopup , addVideo , uploadPublicId , courseId } = this.props;

    if(isEmpty({videoTitle})){
      setPopup(true,"Enter video title","error")
      return;
    }  

    addVideo({videoTitle,uploadPublicId} , courseId);
  }

  componentWillUnmount(){
    const { setUploadStaus , setDetailFields } = this.props;
    
    setUploadStaus(false);
    setDetailFields("videoTitle","");
  }

  render() {
    const { videoTitle , setDetailFields , uploadStatus } = this.props;
    return (
      <div className="upload">
        <h1 className="upload__heading">Add Video</h1>
        <div className="upload__title">
          <label htmlFor="videoTitle">Video Title</label>
          <input type="text" name="videoTitle" value={ videoTitle } onChange={(e)=>{setDetailFields(e.target.name,e.target.value)}} />
        </div>
        <div className="upload__video">
          <p>Upload your video via our widget</p>
          <div><button disabled={ uploadStatus } className="upload__btn" id="upload_widget_opener">{uploadStatus?"Done":"Upload"}</button></div>
        </div>
        <button className="upload__addvid" onClick={this.handleVideoAddition} disabled={!uploadStatus}>Add Video <PlayCircleOutlineIcon/></button>
      </div>
    )
  }
}


const mapStatesToProps = (state) => { 
  return {
    videoTitle : state.details.videoTitle,
    uploadStatus : state.details.uploadStatus,
    uploadPublicId : state.details.uploadPublicId
  }
} 

const mapDispatchToProps = (dispatch) => { 
  return {
    setPopup : (status,text,popupType) => dispatch(setPopup(status,text,popupType)),
    setDetailFields : (name,value) => dispatch(setDetailFields(name,value)),
    setUploadStaus : (status,publicId) => dispatch(setUploadStaus(status,publicId)),
    addVideo : (videoDetails,id) => dispatch(addVideo(videoDetails,id))
  }
}

export default connect( mapStatesToProps , mapDispatchToProps )(UploadWidget);
