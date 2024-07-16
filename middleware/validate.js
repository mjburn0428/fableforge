const validator = require('../validation/validate');

const saveThread = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    ublishedDate: 'required|string',
    content: 'required|string',
    tags: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
    saveThread
};