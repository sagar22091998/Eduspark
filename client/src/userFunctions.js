import React, { Component } from 'react'
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