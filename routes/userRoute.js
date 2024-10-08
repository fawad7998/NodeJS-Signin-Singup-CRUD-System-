const express = require('express');
const { Register, login } = require('../controller/userController');
const router = express.Router();

router.post('/register', Register);
router.post('/login', login);

module.exports = router;
