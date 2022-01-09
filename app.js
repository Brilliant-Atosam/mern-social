const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const morgan = require('morgan')
const helmet = require('helmet')
// custom modules
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
mongoose.connect('mongodb://localhost/', async(err)=>{
    if(err) console.log('Error: '+ err.message) 
    else console.log('BD connection established')
})
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('common'))
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello')
})
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)
app.use('/posts', postRoutes)
app.listen(3001, () => console.log('Up and running'))