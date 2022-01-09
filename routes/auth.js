const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')
router.get('/', (req, res) =>{
    res.send('Auth')
})
// Register
router.post('/register', async(req, res) =>{
    const {username, password, email} = req.body
    const newUser = new User({
        username,
        password: await bcrypt.hash(password, 10),
        email
    })
    try {
        await newUser.save()
        res.json(newUser)
    } catch (error) {
        res.json('Error: ' + error.message)
    }
})
// Login
router.post('/login', async(req, res) =>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        !user && res.status(404).json('Invalid email')
        const validPassword = await bcrypt.compare(password, user.password)
        !validPassword && res.status(400).json('wrong password')
        res.status(200).json(user)
    } catch (error) {
        
    }
})
module.exports = router