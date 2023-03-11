const ErrorHandler = require("../middleware/error");
const User = require("../models/user.model");
const StatusCode = require("http-status-codes");

const userRegistration = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new ErrorHandler("User alredy registerd", StatusCode.BAD_REQUEST);
  }
  const newUser = await User.create(req.body);
  res.status(StatusCode.OK).json({
    success: true,
    message: " User register successfully",
    newUser,
  });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler("Email or  is incorrect ", StatusCode.BAD_REQUEST);
  }
  const match = user.checkPassword(password);
  if (!match) {
    throw new ErrorHandler(
      "Email or Password is incorrect",
      StatusCode.BAD_REQUEST
    );
  }
  const token = user.jwtToken();
  res
    .status(StatusCode.OK)
    .cookie("token", token, { maxAge: 7 * 1000 * 24 * 1000, httpOnly: true })
    .json({
      success: true,
      message: " User login successfully",
      user,
      token,
    });
};

const userLogout = async (req, res, next) => {
  res.status(StatusCode.OK).clearCookie("token").json({
    success: true,
    message: " User logout successfully",
  });
};

// const userToken = (req, res, next) => {
//   res.status(StatusCode.OK).json({
//     success: true,
//     message: " User login successfully",
//     user: req.user,
//   });
// };
module.exports = { userRegistration, userLogin, userLogout };
