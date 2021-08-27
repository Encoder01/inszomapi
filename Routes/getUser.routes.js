const express = require('express');
const { getUser } = require('../Controllers/getUser.controller');
const router = express.Router();

router.get('/:userName', getUser);

module.exports = router;