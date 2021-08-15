const models = require('../models');

module.exports = {
  put: (req, res) => {
    models.reviews.incrementHelpfulness(req.params)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log('err puttin');
      });
  }
};
