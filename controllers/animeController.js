const Anime = require('../models/Anime');
const asyncWrapper = require('../helpers/asyncWrapper');

const indexPage = asyncWrapper(async (req, res, next) => {
  res.status(200).render('home');
});
const listPage = asyncWrapper(async (req, res, next) => {
  const animes = await Anime.find({});
  res.status(200).render('list', { animes });
});
const detailPage = asyncWrapper(async (req, res, next) => {
  const anime = await Anime.findOne({
    name: req.params.name,
  }).populate('genres');
  res.render('detail', { anime });
});

module.exports = { indexPage, listPage, detailPage };
