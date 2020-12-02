const express = require('express');
const animeController = require('../controllers/animeController');

const router = express.Router();

router.get('/animelist', animeController.homePage);
router.get('/detail', animeController.detailPage);

module.exports = router;
