const express = require("express");
const {
    getPosts,addPosts,receiveEvent
} = require('../controllers/posts');

const router = express.Router();

router.route('/create').post(addPosts)
// router.route('/').get(getPosts)

router.route('/events').post(receiveEvent)

module.exports = router;