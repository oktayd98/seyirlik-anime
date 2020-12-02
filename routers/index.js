const { Router } = require('express');
const express = require('express');
const admin = require('./admin');
const anime = require('./anime');
const animeController = require('../controllers/animeController');
const router = express.Router();

router.use('/admin', admin);
router.use('/', anime);
/**/

module.exports = router;
