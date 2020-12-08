const tokenHelper = require('../helpers/tokenHelpers');

const isAuth = (req, res, next) => {
    if (!tokenHelper.isExists(req)) {
        return res.redirect('login');
    }
    tokenHelper.verify(req, res, next);
};

module.exports = isAuth;
