const jwt = require('jsonwebtoken');

const sendToken = (user, res) => {
    const token = user.generateToken();
    const { JWT_COOKIE, NODE_ENV } = process.env;
    res.status(200)
        .cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
            secure: NODE_ENV === 'development' ? false : true,
        })
        .json({
            access_token: token,
        });
};

const getToken = (req) => {
    const token = req.headers.authorization;
    return token;
};

const isExists = (req) => {
    return !!req.headers.authorization;
};

const verify = (req, res, next) => {
    const token = getToken(req);
    const JWT_SECRET = process.env.JWT_SECRET;
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return next(new CustomError("You're not allowed!", 401));
        req.user = {
            id: decoded.id,
            name: decoded.name,
        };
        return next();
    });
};

module.exports = { sendToken, getToken, isExists, verify };
