const path = require("path");
const { randomBytes } = require('crypto');
const axios = require('axios');
const asyncHandler = require("../middleware/async");

//error is somewhere here
exports.receiveEvent = asyncHandler(async (req,res,next) => {
    console.log("Received event",req.body.type)

    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/api/v1/events', {
        type: 'CommentModerated',
        data: {
            id: data.id,
            postId: data.postId,
            status,
            content:data.content  
            }
        });
    }
    res.status(200).json({ success: true});
});