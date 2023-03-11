const errorHandler = async (err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || "Server has something wrong";

  res.status(statuscode).json({
    success: false,
    message: message,
  });
};

const pagenotFound = async (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not Found",
  });
};

module.exports = { errorHandler, pagenotFound };
