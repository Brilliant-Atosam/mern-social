const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { findByIdAndUpdate } = require('../models/User');
router.get('/', async(req, res) =>{
    const users = await User.find()
    res.json(users)
})
// update user
router.put('/:id', async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        !user && res.send('Unrecognized user')
        if(user || user.isAdmin){
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 10);
                console.log('Pass changed');
            }
            try{
                await User.findByIdAndUpdate(user._id, {
                    $set: req.body
                })
                res.json(user)
                console.log('Updated');
            }catch(err){
                res.status(500).res.json('Error!', err.message)
                // res.send('err')
                console.log(err)
            }
        }
    } catch(err){
        res.status(500).json(err.message)
    }
})

// Delete user
router.delete('/:id', async(req, res) =>{
    const user = await User.findByIdAndDelete(req.params.id)
    if(user){
        res.status(200).json('User deleted successfully')
    } else{
        res.status(500).json('You cant delete this user')
    }
})

// Get a user
router.get('/:id', async(req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            const {password, __v,createdAt, updatedAt, ...others} = user._doc
            res.json(others)
        } else{
            res.status(404).json('No user found!')
        }
    } catch (error) {
        res.status(500).json('Something isn\'t right')
    }
})

// Follow a user
router.put('/:id/follow', async(req, res) =>{
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id)
    if(user._id != currentUser.id){
        if(!user.followers.includes(currentUser._id)){
            try{
                await user.updateOne({$push: {followers: req.body.id}})
                await currentUser.updateOne({$push: {followings: req.body.id}})
                res.status(200).json('User has been followed');
            }catch(err){
                res.status(500).json(err.message)
            }
        } else{
            res.status(403).json('You alread follow this user')
        }
    } else{
        res.status(404).json('You can\'t follow yourself')
    }
})
// Unfollow user
router.put('/:id/unfollow', async(req, res) =>{
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id)
    if(user._id != currentUser.id){
        if(user.followers.includes(currentUser._id)){
            try{
                await user.updateOne({$pull: {followers: req.body.id}})
                await currentUser.updateOne({$pull: {followings: req.body.id}})
                res.status(200).json('User has been unfollowed');
            }catch(err){
                res.status(500).json(err.message)
            }
        } else{
            res.status(403).json('You don\'t follow this user!')
        }
    } else{
        res.status(404).json('This is not possible')
    }
})
module.exports = router