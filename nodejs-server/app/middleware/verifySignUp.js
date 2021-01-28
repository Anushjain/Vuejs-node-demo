const db = require('../models')
const User = db.user

checkDuplicateEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (user) {
    res.status(400).send({
      message: 'Failed! Email is already in use!'
    })
    return
  }
  next()
}

const verifySignUp = {
  checkDuplicateEmail
}

module.exports = verifySignUp
