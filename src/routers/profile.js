const express = require('express')
const auth = require('../middleware/auth')
const Profile = require('../models/profile')
const router = new express.Router()

router.post('/profiles', async(req, res) => {
    const profile = new Profile(req.body)

    try{
        await profile.save()
        const token = await profile.generateAuthToken()
        res.status(201).send({profile, token})
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
        res.status(400).send()
    }
})

router.get('/profiles', auth, async(req, res) => {
    try{
        const profiles = await Profile.find({})
        res.send(profiles)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/profiles/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const profile = await Profile.findById(_id)
        if(!profile){
            return res.status(404).send()
        }
        res.send(profile)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/profiles/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','address','number']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    try{
        const profile = await Profile.findById(req.params.id)
        updates.forEach((update) => profile[update] = req.body[update])
        await profile.save()
        // const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!profile){
            return res.status(404).send()
        }
        res.send(profile)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/profiles/:id', async (req, res) => {
    try{
        const profile = await Profile.findByIdAndDelete(req.params.id)
        if(!profile){
            return res.status(404).send()
        }
        res.send(profile)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router