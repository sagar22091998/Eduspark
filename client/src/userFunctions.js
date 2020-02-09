
import axios from 'axios'

export const getProfile = token => {
    return axios.get('/profiles/me', {headers: {Authorization: `Bearer ${token}`}})
    .then(response => {
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const logoutProfile = token => {
    return axios.post('/logout', {headers: {Authorization: `Bearer ${token}`}})
    .then(response =>{
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const getAllCourses = () => {
    return axios.get('/coursesAll')
    .then(response => {
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const instructorCourses = token => {
    return axios.get('/courses', {headers: {Authorization: `Bearer ${token}`}})
    .then(response => {
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const studentCourses = token => {
    return axios.get('/studentCourses', {headers: {Authorization: `Bearer ${token}`}})
    .then(response => {
        return response.data
    }).catch(err => {
        console.log(err)
    })
}