const path = require('path')
const express = require('express')
require('./src/db/mongoose')
const profileRouter = require('./src/routers/profile')
const courseRouter = require('./src/routers/course')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(profileRouter)
app.use(courseRouter)

// for getting different requests from the user to server
app.use(morgan('tiny'))
// app.use(cors())

app.listen(port, () => {
    console.log(`Express server started at port: ${port}.` )
})