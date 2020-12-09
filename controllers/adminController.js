const Admin = require('../models/Admin');
const asyncWrapper = require('../helpers/asyncWrapper');
const inputHelper = require('../helpers/inputHelpers');
const tokenHelper = require('../helpers/tokenHelpers');
const CustomError = require('../helpers/CustomError');

const login = asyncWrapper(async (req, res, next) => {
    if (req.method === 'GET') {
        if (!tokenHelper.isExists(req)) return res.status(200).render('admin/login');
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

const register = asyncWrapper(async (req, res, next) => {
    const user = await Admin.create({
        ...req.body,
    });
    res.json({
        success: true,
        user: {
            name: user.username,
        },
    });
});

const newanime = asyncWrapper(async (req, res, next) => {
    res.render('admin/newanime');
});

module.exports = { login, register, newanime, logout };
