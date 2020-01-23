const jwt = require('jsonwebtoken')
const Profile = require('../models/profile')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace
        console.log(token)
    }
    catch(e){
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth