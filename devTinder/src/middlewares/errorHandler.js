const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥", err);

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Something went wrong",
  });
};

module.exports = errorHandler;