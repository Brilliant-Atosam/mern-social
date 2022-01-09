const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
router.get('/', async(req, res) =>{
    const posts = await Post.find()
    res.json(posts)
})
// Create post
router.post('/', async(req, res) =>{
    const {userId, desc} = req.body
    const newPost = new Post({
        userId,
        desc
    })
    try{
        await newPost.save()
        res.status(200).json(newPost)
    } catch(err){
        res.status(500).json(err.message)
    }
})
// Update post
router.put('/:id', async(req, res) =>{
    const post = await Post.findById(req.params.id);
   try{
    if(post.userId === req.body.userId){
        await post.updateOne({$set:req.body})
        res.status(200).json(post)
    } else{
        res.status(403).json('You can\'t update somebody\'s quote')
    }
   }catch(err){
       res.status(500).json(err.message)
   }
})
// Delete post
router.delete('/:id', async(req, res) =>{
    const post = await Post.findById(req.params.id);
   try{
    if(post.userId === req.body.userId){
        await post.deleteOne()
        res.status(200).json('Post has been delete')
    } else{
        res.status(403).json('You can\'t delete somebody\'s quote')
    }
   }catch(err){
       res.status(500).json(err.message)
   }
})
// Like post
router.put('/:id/like', async(req, res) =>{
    const post = await Post.findById(req.params.id)
    try{
        if(!post.likes.includes(req.body.userId)){
           await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json('Liked!')
        } else{
           await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(403).json('Unliked')
        }
    } catch(err){
        res.status(500).json(err.message)
        console.log('catch')
    }
})
// Get a post
router.get('/:id', async(req, res) =>{
   try{
    const post = await Post.findById(req.params.id);
    !post && res.status(404).res.json('No post found');
    post && res.status(200).json(post)
   }catch(err){
       res.status(500).json(err.message)
   }
})
// Get post on timeline
router.get('/timeline/all', async(req, res)=>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({userId: currentUser._id})
        const friendPost = await Promise.all(
            currentUser.followings.map(friendId =>{
                return Post.find({userId: friendId})
            })
        )
        res.json(userPost.concat(...friendPost))
    } catch(err){
        res.status(500).json(err.message)
    }
})
module.exports = router