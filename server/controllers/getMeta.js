const models = require('../models');

const ratingBuilder = (rows, obj) => {
  rows.forEach((item) => Object.assign(obj.ratings, item.ratingcount));
};

const recommendedBuilder = (rows, obj) => {
  obj.recommend['0'] = rows[0].recommend.false || 0;
  obj.recommend['1'] = rows[1].recommend.true || 0;
};

const characteristicsBuilder = (rows, obj) => {
  rows.forEach((item) => Object.assign(obj.characteristics, item.chars));
};

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
        ratingBuilder(rows, productObj);
      })
      .catch((err) => {
        console.log('err in metaRatings')
      });

    const recomends = models.meta.getRecommend(req.query)
      .then(({ rows }) => {
        recommendedBuilder(rows, productObj);
      })
      .catch((err) => {
        console.log('err in metaRecommends')
      });

    const characteristics = models.meta.getCharacteristics(req.query)
      .then(({ rows }) => {
        characteristicsBuilder(rows, productObj);
      })
      .catch((err) => {
        console.log('err in metaCharacteristics')
      });

    Promise.all([ratings, recomends, characteristics])
      .then((data) => {
        res.send(productObj);
      })
      .catch((err) => {
        res.send(err);
      })
  }
};
