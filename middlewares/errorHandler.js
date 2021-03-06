const CustomError = require('../helpers/CustomError');

const errorHandler = (err, req, res, next) => {
  const e = err;

  if (e.code === 'E11000') {
    return;
  }
  return res.status(e.status || 500).json({
    status: e.status || 500,
    message: e.message,
  });
};

module.exports = errorHandler;
