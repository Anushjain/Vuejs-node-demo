
const authService =require('./auth.service');


exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const message = await authService.createUser(req.body);

    res.status(200).send({
      message,
    });
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};

exports.login = async (req, res) => {
  try {
    const resUser = await authService.loginUser(req.body);
    res.cookie('authToken', resUser.token, {
      maxAge: 86400,
      httpOnly: true,
    });
    res.status(200).send({
      id: resUser.user.id,
      name: resUser.user.name,
      email: resUser.user.email,
      accessToken: resUser.token,
    });
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const obj = await authService.logoutUser(token);
    res.status(200).send(obj);
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    resUser = await authService.verifyOtp(req.body);
    console.log(resUser);
    res.cookie('authToken', resUser.token, {
      maxAge: 86400,
      httpOnly: true,
    });
    res.status(200).send({
      id: resUser.user.id,
      name: resUser.user.name,
      email: resUser.user.email,
      accessToken: resUser.token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
  }
};
