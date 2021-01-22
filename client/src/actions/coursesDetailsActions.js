import { SET_CURRENT_VIDEO, SET_DETAIL_FIELDS, SET_UPLOAD_STATUS , SET_VIDEOS_LOADING, SET_VIDEO_LIST , SET_EDIT_TITLE_MODAL } from "./actionTypes" 
import { requestHandler } from "../utils/requestHandler"
import { setPopup , setDeleteModal } from "./index"
import { returnToTop } from "../utils/utilityFunctions"

export const setUploadStaus = ( status , publicId = "" ) => ({ type:SET_UPLOAD_STATUS , status , publicId })

export const setDetailFields = (name,value) => ({ type : SET_DETAIL_FIELDS , name , value })

export const setCurrentVideo = (publicId) => ({ type : SET_CURRENT_VIDEO , publicId})

export const setEditTitleModal = (status,oldTitle="") => ({ type : SET_EDIT_TITLE_MODAL , status , oldTitle})

export const getAllVideos = (id) => async ( dispatch ) => {
  
  dispatch(({ type : SET_VIDEOS_LOADING , status : true }));
  
  const token = localStorage.getItem('token');

  const res = await requestHandler(`instructor/course/details/${id}`, {
    method:"GET",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })
  
  const videoData = await res.json();
  
  if(res.status===200){
    if(videoData.data.course.videos[0]){
      videoData.data.course.videos.sort((a, b) => {
        return a.videoNumber - b.videoNumber;
      });
      dispatch(setCurrentVideo(videoData.data.course.videos[0].publicId));
    }
    
    returnToTop();
    dispatch(({ type : SET_VIDEO_LIST , list : videoData.data.course.videos , description : videoData.data.course.description , price : videoData.data.course.price , name : videoData.data.course.name , enrolled : videoData.data.studentsEnrolled }));
    
    if(videoData.data.course.videos[0])
      dispatch(setCurrentVideo(videoData.data.course.videos[0].publicId));
    
    
    dispatch(({ type : SET_VIDEOS_LOADING , status : false }));
  } 
  else {
    console.log("Videos not obtained.");
  }
}

export const addVideo = (videoDetails,id) => async ( dispatch ) => {
  
  const token = localStorage.getItem('token');
  
  const res = await requestHandler(`instructor/video/add/${id}`, {
    method:"POST",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      topic : videoDetails.videoTitle,
      publicId : videoDetails.uploadPublicId
    })
  })

  if(res.status===201){
    dispatch(setPopup(true,"Video added","success"));
    dispatch(setUploadStaus(false));
    dispatch(setDetailFields("videoTitle",""));
    dispatch(getAllVideos(id));
  } 
  else {
    console.log("Videos not added.");
  }
}

export const deleteVideo = (courseId) => async ( dispatch , getState ) => {
  
  const token = localStorage.getItem('token');
  const { currentVideo , allVideosList } = getState().details;

  const videoIndex = allVideosList.find(video => video.publicId === currentVideo )

  const res = await requestHandler(`instructor/video/delete/${courseId}?number=${videoIndex.videoNumber}`, {
    method:"DELETE",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    }
  })

  if(res.status===200){
    dispatch(setPopup(true,"Video removed","warning"));
    dispatch(getAllVideos(courseId));
    dispatch(setDeleteModal(false));
  } 
  else {
    console.log("Videos not removed.");
  }
}

export const editVideoTitle = (courseId,newTitle) => async ( dispatch , getState ) => {
  
  const token = localStorage.getItem('token');
  const { currentVideo , allVideosList } = getState().details;

  const videoIndex = allVideosList.find(video => video.publicId === currentVideo )

  const res = await requestHandler(`instructor/video/update/${courseId}?number=${videoIndex.videoNumber}`, {
    method:"PUT",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify({
      topic : newTitle,
      publicId : currentVideo
    })
  })

  if(res.status===200){
    dispatch(setPopup(true,"Video Title Updated","success"));
    dispatch(getAllVideos(courseId));
    dispatch(setEditTitleModal(false));
    dispatch(setDetailFields("newTitle",""));
  } 
  else {
    console.log("Videos title not updated.");
  }
}

export const changeOrder = (orderType,courseId) => async ( dispatch , getState ) => {
  
  const token = localStorage.getItem('token');
  const { currentVideo , allVideosList } = getState().details;

  const videoIndex = allVideosList.find(video => video.publicId === currentVideo )

  let reqBody;
  if(orderType==="UP"){
    reqBody = {
      firstVideo : Number(videoIndex.videoNumber),
      secondVideo : Number(videoIndex.videoNumber-1)
    }
  }
  else if(orderType==="DOWN") {
    reqBody = {
      firstVideo : Number(videoIndex.videoNumber),
      secondVideo : Number(videoIndex.videoNumber+1)
    }
  }

  const res = await requestHandler(`instructor/video/shift/${courseId}`, {
    method:"PUT",
    headers:{ 
      "Content-Type":"application/json",
      "Authorization" :`Bearer ${token}`
    },
    body: JSON.stringify(reqBody)
  })

  if(res.status===200){
    dispatch(setPopup(true,"Order changed","warning"));
    dispatch(getAllVideos(courseId));
  } 
  else {
    console.log("Order not changed");
  }
}
