const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://taskapp:ruturajkanake@cluster0-y4bgq.mongodb.net/test?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>
    console.log('MongoDB connected')
).catch(err => console.log(err))