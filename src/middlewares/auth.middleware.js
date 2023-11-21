const User = require('../api/models/user.model')
const { verifyToken } = require('../utils/token')

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {return next(new Error('Unauthorized'))}
  try {
    const decodedToken = verifyToken(token, process.env.JWT_SECRET)
    userLogged = await User.findById(decodedToken.id)
    userLogged.password = null;
    req.user = userLogged;
    next()
  } catch (error) {
    return next(error)
  }
}

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {return next(new Error('Unauthorized'))}
  try {
      const decodedToken = verifyToken(token, process.env.JWT_SECRET);
      const userLogged = await User.findById(decodedToken.id);
      if (userLogged.role === "admin") {
          userLogged.password = null;
          req.user = userLogged;
          next();
      } else {
          return next("You are not an admin");
      }
  } catch (error) {
      return next(error);
  }
};

module.exports = { isAuth, isAdmin }