const path = require("path");
const { randomBytes } = require('crypto');
const axios = require('axios');
const asyncHandler = require("../middleware/async");
// const { post } = require("../routes/query");

const posts = {};

// @desc get Posts
// @route GET /api/v1/posts
// @access Public
exports.getPosts = asyncHandler(async (req,res,next) => {

    res.status(200).json({ success: true, data: posts});
});

// @desc receive event
// @route POST /api/v1/posts/events
// @access Public
exports.receiveEvent = asyncHandler(async (req,res,next) => {
    console.log("Received event",req.body.type)

    const { type, data } = req.body;


    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status} = data;

        
        try{
            const post = posts[postId]
            post.comments.push( { id, content, status});
        } catch(err) {
            console.log(err.message)
        }
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        try{
            const post = posts[postId];
            const comment = post.comments.find(comment => {
                return comment.id === id;
            });
            comment.status = status;
            comment.content = content;
        } catch(err) {
            console.log(err.message)
        }
    }

    // console.log("posts",posts)
    res.status(200).json({ success: true, data: posts});
});