const models = require('../models');

module.exports = {
  get: (req, res) => {
    models.reviews.getReviews((err, data) => {
      if (err) {
        res.status(404).send('error getting data');
      } else {
        res.status(200).send(data.rows);
      }
    });
  }, // a function which handles a get request for all messages
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
