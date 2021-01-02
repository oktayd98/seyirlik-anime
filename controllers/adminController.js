const Admin = require('../models/Admin');
const asyncWrapper = require('../helpers/asyncWrapper');
const inputHelper = require('../helpers/inputHelpers');
const tokenHelper = require('../helpers/tokenHelpers');
const CustomError = require('../helpers/CustomError');
const Anime = require('../models/Anime');
const Genre = require('../models/Genre');
const Collection = require('../models/Collection');

const login = asyncWrapper(async (req, res, next) => {
  if (req.method === 'GET') {
    if (!tokenHelper.isExists(req))
      return res.status(200).render('admin/login');
    return res.redirect('newanime');
  }

  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (!inputHelper.checkInputs)
      return next(new CustomError('Check your credentials', 400));

    const user = await Admin.findOne({ username }).select('+password');
    if (!user) return next(new CustomError('Check your credentials', 400));

    const isValid = await inputHelper.validateUser(password, user.password);
    if (!isValid) return next(new CustomError('Check your credentials', 400));

    tokenHelper.sendToken(user, res);
  }
});
const logout = (req, res, next) => {
  return res
    .status(200)
    .cookie('access_token', '', {
      expires: new Date(Date.now() - 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    })
    .redirect('login');
};

const animelist = asyncWrapper(async (req, res, next) => {
  res.render('admin/animelist');
});

const newAnime = asyncWrapper(async (req, res, next) => {
  if (req.method === 'GET') {
    const genres = await Genre.find({});
    res.render('admin/newanime', {
      genres: genres,
    });
  }
  if (req.method === 'POST') {
    const {
      name,
      poster,
      rate,
      episodes,
      year,
      status,
      genres,
      synopsis,
    } = req.body;

    if (poster === '') {
      await Anime.create({
        name,
        rate,
        episodes,
        year,
        status,
        genres,
        synopsis,
      });
    } else {
      await Anime.create({
        name,
        poster,
        rate,
        episodes,
        year,
        status,
        genres,
        synopsis,
      });
    }

    res.redirect('newanime');
  }
});

const newCollection = asyncWrapper(async (req, res, next) => {
  const animes = await Anime.find({});
  if (req.method === 'GET') res.render('admin/newcollection', { animes });
  if (req.method === 'POST') {
    const { name, description, animes } = req.body;
    const poster = await Anime.findOne({ _id: animes[0] }, { poster: 1 });
    await Collection.create({
      name,
      description,
      animes,
      poster: poster.poster,
    });
    res.redirect('newcollection');
  }
});

module.exports = {
  login,
  animelist,
  logout,
  newAnime,
  newCollection,
};
