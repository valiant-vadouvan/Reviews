const models = require('../models');

module.exports = {
  get: (req, res) => {
    const page = req.query.page || 0;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'helpful';
    const { product_id } = req.query;
    const productObj = { product: product_id, count, page, sort, results: [] };

    models.reviews.getReviews(productObj)
      .then(({ rows }) => {
        productObj.results = rows;
        res.send(productObj);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  post: (req, res) => {
    models.reviews.postReview(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};
