const express = require('express')
const router = express.Router()
const appController = require('../Controller/appController')


router.post('/register',appController.signup);
router.post('/login',appController.login);

module.exports = router;