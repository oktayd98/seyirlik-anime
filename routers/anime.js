const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

router.get('/animelist', animeController.listPage);
router.get('/detail/:name', animeController.detailPage);
router.get('/', animeController.indexPage);

module.exports = router;
