 class AppError extends Error {
    message;
    statusCode;
  constructor(statusCode, message) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;