const path = require("path");
const axios = require('axios');
const asyncHandler = require("../middleware/async");

const events = [];

// @desc get Events emitted by all microservices
// @route GET /api/v1/events
// @access Public
exports.getEvents = asyncHandler(async (req,res,next) => {
    const event = req.body;
    
    events.push(event);
    
    await axios.post('http://localhost:4000/api/v1/posts/events',event);
    await axios.post('http://localhost:4001/api/v1/comments/events',event);
    try{
        await axios.post('http://localhost:4002/api/v1/query/events',event);
    }catch(err){
        console.log(err.message);
    }
    await axios.post('http://localhost:4003/api/v1/moderation/events',event);

    res.status(200).json({ success: true});
});


// @desc retrieve event history (log of events)
// @route GET /api/v1/eventss
// @access Public
exports.retrieveEventHistory = asyncHandler(async (req,res,next) => {

    res.status(200).json({ success: true,data: events});
});