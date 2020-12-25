const path = require('path')
const express = require('express')
require('./src/db/mongoose')
const profileRouter = require('./src/routers/profile')
const courseRouter = require('./src/routers/course')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000
// CONSOLE
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(profileRouter)
app.use(courseRouter)

app.listen(port, () => {
    console.log(`Express server started at port: ${port}.` )
})