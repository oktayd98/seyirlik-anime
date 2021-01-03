const Anime = require('../models/Anime');
const Genre = require('../models/Genre');
const Collection = require('../models/Collection');
const asyncWrapper = require('../helpers/asyncWrapper');

const indexPage = asyncWrapper(async (req, res) => {
  const anime = await Anime.getRandom();
  res.status(200).render('home', { anime });
});

const listPage = asyncWrapper(async (req, res) => {
  const animes = await Anime.find({}).sort({ name: 1 });
  const genres = await Genre.find({}).sort({ name: 1 });
  const years = await Anime.distinct('year');
  const data = {
    animes,
    genres,
    years,
  };
  return res.status(200).render('list', { data });
});

const detailPage = asyncWrapper(async (req, res) => {
  const anime = await Anime.findOne({
    name: req.params.name,
  }).populate('genres');
  res.render('detail', { anime });
});

const collectionPage = asyncWrapper(async (req, res) => {
  const collections = await Collection.find({}).populate('animes');
  res.render('collections', { collections });
});

const searchPage = asyncWrapper(async (req, res) => {
  if (req.query.name) {
    const query = req.query.name.toLowerCase();
    const animes = await Anime.find({
      name: { $regex: query, $options: 'i' },
    });
    const genres = await Genre.find({}).sort({ name: 1 });
    const years = await Anime.distinct('year');
    const data = {
      animes,
      genres,
      years,
    };

    return res.status(200).render('list', { data });
  } else filterPage(req, res);
});

const filterPage = asyncWrapper(async (req, res) => {
  if (req.query.start) {
    const re = new RegExp(`^${req.query.start}`);
    const animes = await Anime.find({ name: re });
    const genresDb = await Genre.find({}).sort({ name: 1 });
    const years = await Anime.distinct('year');
    const data = {
      animes,
      genres: genresDb,
      years,
    };
    return res.status(200).render('list', { data });
  }

  const conditions = {};
  for (const [key, value] of Object.entries(req.query)) {
    if (value !== '') {
      conditions[key] = value;
    }
  }

  const animes = await Anime.find(conditions);
  const genresDb = await Genre.find({}).sort({ name: 1 });
  const years = await Anime.distinct('year');
  const data = {
    animes,
    genres: genresDb,
    years,
  };
  return res.status(200).render('list', { data });
});

module.exports = {
  indexPage,
  listPage,
  detailPage,
  collectionPage,
  searchPage,
  filterPage,
};
