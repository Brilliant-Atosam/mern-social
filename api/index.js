const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
// const dotenv = require("dotenv");
// const helmet = require("helmet");
// const morgan = require("morgan");
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const path = require('path')
// dotenv.config();

mongoose.connect(
  'mongodb://localhost/social',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log('Connected to MongoDB');
  }
);
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
})
const upload = multer({storage: fileStorage})

app.post('/upload', upload.single('file'), (req, res) =>{
  try{
    return res.status(200).json('File upload successful')
  } catch(err){
    res.status(500).json('Something went wrong!')
    consle.log(err.message)
  }
})
//middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
// app.use(helmet());
// app.use(morgan("common"));

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);

app.listen(3001, () => {
  console.log('Backend server is running!');
});
