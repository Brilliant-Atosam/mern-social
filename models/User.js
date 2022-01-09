const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        min: 3,
        max: 50,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        min: 6,
        required: true
    },
    profilePicture:{
        type: String,
        default: ''
    },
    cover:{
        type: String,
        default: ''
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        max: 300
    },
    city:{
        type: String,
        max:50
    },
    From:{
        type: String,
        max:50
    },
    relationship:{
        type: Number,
        enum: [1, 2, 3]
    }
})
userSchema.set('timestamps', true);
const User = mongoose.model('User', userSchema)
module.exports = User