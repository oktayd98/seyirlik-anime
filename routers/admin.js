const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuth = require('../middlewares/isAuth');

router.get('/', adminController.login);
router.get('/login', adminController.login);
router.get('/logout', adminController.logout);
router.get('/animelist', isAuth, adminController.animelist);
router.get('/newanime', isAuth, adminController.newAnime);
router.get('/newcollection', isAuth, adminController.newCollection);
router.post('/newanime', isAuth, adminController.newAnime);
router.post('/login', adminController.login);
router.post('/register', adminController.register);

module.exports = router;
