const path = require("path");
const axios = require('axios');
const asyncHandler = require("../middleware/async");

// @desc get Posts
// @route GET /api/v1/posts
// @access Public
exports.getEvents = asyncHandler(async (req,res,next) => {
    const event = req.body;
    console.log(event)    
    
    axios.post('http://localhost:4000/api/v1/posts/events',event);
    axios.post('http://localhost:4001/api/v1/comments/events',event);
    axios.post('http://localhost:4002/api/v1/query/events',event);

    res.status(200).json({ success: true});
});