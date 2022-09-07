const express = require("express");
const {
    getEvents,retrieveEventHistory
} = require('../controllers/events');

const router = express.Router();

router.route('/').get(retrieveEventHistory).post(getEvents);

module.exports = router;