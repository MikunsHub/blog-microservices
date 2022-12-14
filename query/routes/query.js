const express = require("express");
const {
    receiveEvent,getPosts
} = require('../controllers/query');

const router = express.Router();

router.route('/').get(getPosts)

router.route('/events').post(receiveEvent)

module.exports = router;