const express = require("express");
const {
    getPosts,addPosts,receiveEvent
} = require('../controllers/posts');

const router = express.Router();

router.route('/').get(getPosts).post(addPosts)

router.route('/events').post(receiveEvent)

module.exports = router;