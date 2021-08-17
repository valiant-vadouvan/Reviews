const models = require('../models');
const helpers = require('./helpers');

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

    const ratings = models.meta.getRatings(req.query)
      .then(({ rows }) => {
        helpers.ratingBuilder(rows, productObj);
      })
      .catch((err) => {
        console.log(err)
      });

    const recomends = models.meta.getRecommend(req.query)
      .then(({ rows }) => {
        helpers.recommendedBuilder(rows, productObj);
      })
      .catch((err) => {
        console.log(err)
      });

    const characteristics = models.meta.getCharacteristics(req.query)
      .then(({ rows }) => {
        helpers.characteristicsBuilder(rows, productObj);
      })
      .catch((err) => {
        console.log(err)
      });

    Promise.all([ratings, recomends, characteristics])
      .then(() => {
        res.send(productObj);
      })
      .catch((err) => {
        res.send(err);
      })
  }
};
