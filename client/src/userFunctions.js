
import axios from 'axios'

export const getProfile = token => {
    return axios.get('/profiles/me', {headers: {Authorization: `Bearer ${token}`}})
    .then(response => {
        console.log(response)
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const logoutProfile = token => {
    return axios.post('/profiles/logout', {headers: {Authorization: `Bearer ${token}`}})
    .then(response =>{
        console.log(response)
        return response.data
    }).catch(err => {
        console.log(err)
    })
}

export const getAllCourses = () => {
    return axios.get('/coursesAll')
    .then(response => {
        // console.log(response.data)
        return response.data
    }).catch(err => {
        console.log(err)
    })
}