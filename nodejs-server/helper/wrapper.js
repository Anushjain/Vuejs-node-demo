const AppError = require('./error')

errorHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ msg: error.message })
    }
    res.status(500).send({ msg: 'Internal Server Error' })
  }
}
module.exports = {
  errorHandler
}
