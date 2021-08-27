const express = require('express');
const { searchUser } = require('../Controllers/searchUser.controller');
const router = express.Router();

router.get('/:userName', searchUser);

module.exports = router;