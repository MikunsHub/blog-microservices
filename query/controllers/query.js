const path = require("path");
const { randomBytes } = require('crypto');
const axios = require('axios');
const asyncHandler = require("../middleware/async");

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

    if( type)

    res.status(200).json({ success: true});
});