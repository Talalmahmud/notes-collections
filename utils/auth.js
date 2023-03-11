const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../middleware/error");

const userAuthentication = async (req, res, next) => {
  if (!req.cookies.token) {
    throw new ErrorHandler("You must be login first", 404);
  }
  const decrytedToken = await jwt.verify(
    req.cookies.token,
    process.env.SECRET_KEY
  );
  const user = await User.findById(decrytedToken.id);
  if (!user) {
    throw new ErrorHandler("Please login first", 404);
  }
  req.user = user;

  next();
};

module.exports = { userAuthentication };
