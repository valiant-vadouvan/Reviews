const models = require('../models');

module.exports = {
  get: (req, res) => {
    const page = req.query.page || 0;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'helpful';
    const { product_id } = req.query;
    const productObj = { product: product_id, count, page, sort, results: [] };

    models.reviews.getReviews(productObj, (err, data) => {
      if (err) {
        res.status(404).send('error getting data');
      } else {
        productObj.results = data.rows;
        res.status(200).send(productObj);
      }
    });
  },
  putHelpful: (req, res) => {
    models.reviews.incrementHelpfulness(args)
      .then((data) => {
      })
      .catch((err) => {
        console.log('err puttin');
      });
  },
  // post: function (req, res) {
  //   models.messages.create((err, data) => {
  //     if (err) {
  //       res.status(404).send('error posting message');
  //     } else {
  //       res.status(200).send(data);
  //     }
  //   }, req);
  // } // a function which handles posting a message to the database
};
