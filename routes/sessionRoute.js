const express = require('express');
const { session, registerUser } = require('../controller/sessionController');
const router = express.Router();

router.post('/session', session);
router.post('/regUser', registerUser);

module.exports = router;
