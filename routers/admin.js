const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuth = require('../middlewares/isAuth');

router.get('/newanime', isAuth, adminController.login);
router.get('/newcollection', isAuth, adminController.login);
router.get('/animes', isAuth, adminController.login);
router.get('/collections', isAuth, adminController.login);
router.get('/login', adminController.login);
router.post('/login', adminController.login);
router.post('/register', adminController.register);

module.exports = router;
