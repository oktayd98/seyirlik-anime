const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuth = require('../middlewares/isAuth');

// router.get('/newcollection', isAuth, adminController.login);
// router.get('/animes', isAuth, adminController.login);
// router.get('/collections', isAuth, adminController.login);
router.get('/newanime', isAuth, adminController.newanime);
router.get('/login', adminController.login);
router.get('/logout', adminController.logout);
router.post('/login', adminController.login);
router.post('/register', adminController.register);

module.exports = router;
