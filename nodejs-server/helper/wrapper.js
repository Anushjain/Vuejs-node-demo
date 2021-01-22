errorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
      .catch((err) => {
        console.log(err);
        res.status(500).send({msg: 'Internal Server Error'});
      });
};
module.exports = {
  errorHandler,
};

