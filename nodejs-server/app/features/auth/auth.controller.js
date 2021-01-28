
const authService = require('./auth.service')

exports.signup = async (req, res) => {
  // Save User to Database
  const message = await authService.createUser(req.body)

  res.status(200).send({
    message
  })
}

exports.login = async (req, res) => {
  const resUser = await authService.loginUser(req.body)
  res.cookie('authToken', resUser.token, {
    maxAge: 86400,
    httpOnly: true
  })
  res.status(200).send({
    id: resUser.user.id,
    name: resUser.user.name,
    email: resUser.user.email
  })
}

exports.logout = async (req, res) => {
  const token = req.cookies.authToken
  const obj = await authService.logoutUser(token)
  res.status(200).send(obj)
}

exports.verifyOtp = async (req, res) => {
  const resUser = await authService.verifyOtp(req.body)
  res.cookie('authToken', resUser.token, {
    maxAge: 86400,
    httpOnly: true
  })
  res.status(200).send({
    id: resUser.user.id,
    name: resUser.user.name,
    email: resUser.user.email
  })
}
