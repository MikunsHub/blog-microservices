const path = require("path");
const { randomBytes } = require('crypto');
const axios = require('axios');
const asyncHandler = require("../middleware/async");

// Mock db represented by an object
const posts = {};

// @desc get Posts
// @route GET /api/v1/posts
// @access Public
exports.getPosts = asyncHandler(async (req,res,next) => {
    res.status(200).json({ success: true, data: posts});
});

// @desc Create Posts
// @route POST /api/v1/posts
// @access Public
exports.addPosts = async (req,res,next) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    //emitting events to the event bus
    try{
        await axios.post('http://localhost:4005/api/v1/events', {
        type: 'PostCreated',
        data: {
            id,title
        }
    });
    }catch(err) {
        console.log(err);
    }
    

    res.status(200).json({ success: true, data: posts});
};

// @desc receive event
// @route POST /api/v1/posts/events
// @access Public
exports.receiveEvent = asyncHandler(async (req,res,next) => {
    console.log("Received event",req.body.type)
    res.status(200).json({ success: true});
});