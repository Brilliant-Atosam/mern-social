const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        max: 500
    },
    img: String,
    likes:{
        type: Array,
        default: []
    },
    comments:{
        type: String
    }

})
postSchema.set('timestamps', true);
const Post = mongoose.model('Post', postSchema)
module.exports = Post