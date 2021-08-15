const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.query;
    const productObj =
    {
      product: product_id,
      ratings: {},
      recommend: {},
      characteristics: {}
    };
    models.reviews.getReviewsMetaData(req.query)
      .then(({ rows }) => {

        res.send(rows)
      })
      .catch((err) => {
        res.send(err);
      });
  }
};
