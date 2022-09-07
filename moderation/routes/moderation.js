const express = require("express");
const {
    receiveEvent
} = require('../controllers/moderation');

const router = express.Router();

// router.route('/posts').get(getPosts).post(addPosts)

router.route('/events').post(receiveEvent)

module.exports = router;