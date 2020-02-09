const express = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const Profile = require('../models/profile')
const router = new express.Router()

router.post('/courses', auth, async (req, res) => {
    if(req.profile.profileType === "instructor")
    {   
        const course=new Course({
            ...req.body,
            owner: req.profile._id
        })
        try{
            await course.save()
            res.status(201).send(course)
        }catch(e){
            res.status(400).send(e)
        }
    }else{
        res.status(401).send('Student cannot create course')
    }
    
})

router.get('/courses', auth, async (req, res) => {
    try{
        await req.profile.populate('courses').execPopulate()
        res.send(req.profile.courses)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/coursesAll', async(req, res) => {
    try{
        const courses = await Course.find({})
        res.send(courses)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/studentCourses', auth, async(req, res) => {
    let courses = []
    for(let i=0;i<req.profile.myCourses.length;i++){
        const course = await Course.findById(req.profile.myCourses[i])
        courses.push(course)
    }
    res.send(courses)
})

router.get('/courses/:id', auth, async (req, res) => {
    const _id = req.params.id 
    try{
        const course = await Course.findOne({_id, owner: req.profile._id})

        if(!course){
            return res.status(404).send()
        }
        res.send(course)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/courses/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'approved']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    try{
        const course = await Course.findOne({ _id, owner: req.profile._id })
        
        if(!course){
            return res.status(404).send()
        }
        updates.forEach((update) => course[update] = req.body[update])
        await course.save()
        res.send(course)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/courses/:id', auth, async (req, res) => {
    try{
        const course = await Course.findOneAndDelete({_id: req.params.id, owner: req.profile._id})
        if(!course){
            res.status(404).send()
        }
        res.send(course)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router