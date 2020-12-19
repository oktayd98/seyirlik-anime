const bcrypt = require('bcryptjs');

const checkInputs = (email, password) => {
  return email && password;
};

const validateUser = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

module.exports = { checkInputs, validateUser };
