export const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(", ");
  }

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // JWT invalid token
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token, please login again";
  }

  // JWT expired token
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired, please login again";
  }

  return res.status(statusCode).json({
    success: false,
    message
  });
};
