const express = require("express");
const {
    getComments,addComments,receiveEvents
} = require('../controllers/comments');

const router = express.Router();

router.route('/posts/:id/comments').get(getComments).post(addComments)

router.route('/comments/events').post(receiveEvents)

module.exports = router;