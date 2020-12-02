const Anime = require('../models/Anime');
const asyncWrapper = require('../helpers/asyncWrapper');

const homePage = (req, res, next) => {
    res.status(200).render('list');
};
const detailPage = (req, res, next) => {
    res.status(200).render('detail');
};

module.exports = { homePage, detailPage };
