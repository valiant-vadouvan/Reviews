const models = require('../models');

module.exports = {
  put: (req, res) => {
    models.report.reportReview(req.params)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send('err puttin');
      });
  }
};
