const Anime = require('../models/Anime');
const asyncWrapper = require('../helpers/asyncWrapper');

const indexPage = asyncWrapper(async (req, res, next) => {
    res.status(200).render('home');
});
const listPage = asyncWrapper(async (req, res, next) => {
    res.status(200).render('list');
});
const detailPage = asyncWrapper(async (req, res, next) => {
    res.status(200).render('detail');
});

module.exports = { indexPage, listPage, detailPage };
