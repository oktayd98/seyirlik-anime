const Anime = require('../models/Anime');
const asyncWrapper = require('../helpers/asyncWrapper');

const indexPage = asyncWrapper(async (req, res, next) => {
  const anime = await Anime.getRandom();
  res.status(200).render('home', { anime });
});

const listPage = asyncWrapper(async (req, res, next) => {
  if (req.query.search) {
    const query = req.query.search.toLowerCase();
    const animes = await Anime.find({
      name: { $regex: query, $options: 'i' },
    });
    console.log(animes);
    return res.status(200).render('list', { animes });
  }

  const animes = await Anime.find({}).sort({ name: 1 });
  return res.status(200).render('list', { animes });
});

const detailPage = asyncWrapper(async (req, res, next) => {
  const anime = await Anime.findOne({
    name: req.params.name,
  }).populate('genres');
  res.render('detail', { anime });
});

module.exports = { indexPage, listPage, detailPage };
