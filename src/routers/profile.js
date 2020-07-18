const express = require('express')
const auth = require('../middleware/auth')
const Profile = require('../models/profile')
const Course = require('../models/course')
const CourseEnrolled = require('../models/courseEnrolled')
const router = new express.Router()

router.post('/profiles', async(req, res) => {
    const profile = new Profile(req.body)
    const check = await Profile.findOne({ email: req.body.email })
    if(check){
        return res.status(409).send('Email already exists.')
    }
    try{
        await profile.save()
        const token = await profile.generateAuthToken()
        res.status(201).send({ profile, token })
    }catch (e){
        res.status(400).send(e)
    }
})

router.post('/profiles/login', async (req, res) => {
    try{
        const profile = await Profile.findByCredentials(req.body.email, req.body.password)
        const token = await profile.generateAuthToken()
        res.send({profile, token})
    }catch (e) {
        res.status(400).send(e)
    }
})

router.post('/logout', auth, async (req, res) => {
    try{
        req.profile.tokens = req.profile.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.profile.save()
        res.send(req.profile)
    }catch (e){
        res.status(500).send(e)
    }
})

router.post('/profiles/logoutAll', auth, async (req, res) => {
    try{
        req.profile.tokens = []
        await req.profile.save()
        res.send()
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/addCourses/:id', auth, async(req, res) => {
    if(req.profile.profileType === "student"){
        courseID = req.params.id
        try{
            const courseEnrolled = await CourseEnrolled.findOne({
                studentId: req.profile._id, 
                courseID 
            })
            if(!courseEnrolled){ 
                const newCourseEnrol = new CourseEnrolled({
                    studentId: req.profile._id,
                    courseID,
                    videosCompleted: 0,
                    courseCompleted: false
                })
                await newCourseEnrol.save();
                res.status(200).send('Course added successfully')   
            }else{
                res.send('Course already added.')
            }
        }catch(e){
            res.status(400).send(e)
        }
    }else{
        res.status(401).send('Instructor cannot add course')
    }
})

router.get('/profiles/me', auth, async (req, res) => {
    let courses = []
    try{
        const myCourses = await CourseEnrolled.find({studentId: req.profile._id}).populate('courseId')
        myCourses.forEach((myCourse)=> {
            course = {
                name: myCourse.courseId.name
            }
            courses.push(course);
        })
        res.send(courses);
    }catch(e){
        res.status(500).send(e)
    }
    res.send(req.profile)
})

router.patch('/profiles/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    try{
        updates.forEach((update) => req.profile[update] = req.body[update])
        await req.profile.save()
        res.send(req.profile)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/profiles', auth, async (req, res) => {
    try{
        await req.profile.remove()
        res.send(req.profile)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router