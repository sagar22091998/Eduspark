const express = require('express')
const auth = require('../middleware/auth')
const Profile = require('../models/profile')
const router = new express.Router()
const jwt = require('jsonwebtoken')

router.post('/profiles', async(req, res) => {
    const profile = new Profile(req.body)

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

router.post('/profiles/logout', auth, async (req, res) => {
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

router.get('/profiles/me', auth, async (req, res) => {
    // const decoded = jwt.verify(req.headers['authorization'],'thisismynewproject')
    // Profile.findOne({ _id: decoded._id })
    // .then(profile => {
    //     if(profile){
    //         res.json(profile)
    //     }else{
    //         res.send('User does not exist')
    //     }
    // }).catch(err => {
    //     res.send('error: '+err)
    // })
    // console.log(profile)
    res.send(req.profile)
})

router.patch('/profiles/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','address','number']
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