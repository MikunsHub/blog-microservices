const path = require("path");
const { randomBytes } = require('crypto');
const axios = require('axios');
const asyncHandler = require("../middleware/async");

// Mock db represented by an object
const commentsByPostId = {};

// @desc get Comments
// @route GET /api/v1/comments
// @access Public
exports.getComments = async (req,res,next) => {
    comments = commentsByPostId[req.params.id] || [];
    res.status(200).json({ success: true, data: comments });
};

// @desc Create Comments
// @route POST /api/v1/comments
// @access Public
exports.addComments = asyncHandler(async (req,res,next) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/api/v1/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(200).json({ success: true, data: comments});
});

// @desc receive events
// @route POST /api/v1/comments/events
// @access Public
exports.receiveEvents = asyncHandler(async (req,res,next) => {
    console.log("Received event",req.body.type)
    res.status(200).json({ success: true});
});