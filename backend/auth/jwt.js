const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  return jwt.sign({
    userId: userId,
  }, 'SECRET_STRING', {
    algorithm: 'HS256',
    expiresIn: '1d'
  })
};

const verifyToken = (token) => {
    const data = jwt.verify(token, 'SECRET_STRING');

    return data;
};

const func = {
    createToken,
    verifyToken
}

module.exports = func;