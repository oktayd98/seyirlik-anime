const Admin = require('../models/Anime');
const asyncWrapper = require('../helpers/asyncWrapper');

const indexPage = asyncWrapper(async (req, res, next) => {
    res.render('admin/index');
});

module.exports = { indexPage };
