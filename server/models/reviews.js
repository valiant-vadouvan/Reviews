var db = require('../db');

module.exports = {
  getReviews: (callback) => {
    const q = `SELECT
    reviews.product_id as product,
    0 as page,
    5 as count,
      json_build_array(
      json_build_object(
        'review_id', reviews.id,
        'rating', reviews.rating,
        'summary', reviews.summary,
        'recommend', reviews.recommend,
        'response', reviews.response,
        'body', reviews.body,
        'date', to_timestamp(reviews.date/1000),
        'reviewer_name', reviews.reviewer_name,
        'helpfulness', reviews.helpfulness
        )) as results
    FROM reviews
      INNER JOIN photos ON reviews.id = photos.review_id
      WHERE product_id = 25167;`
    db.query(q,
    (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }, // a function which produces all the messages


//   SELECT
//   reviews.product_id as product,
//   0 as page,
// 5 as count,
//   json_build_array(
//     json_build_object(
//       'review_id', reviews.id,
//       'rating', reviews.rating,
//       'summary', reviews.summary,
//       'recommend', reviews.recommend,
//       'response', reviews.response,
//       'body', reviews.body,
//       'date', to_timestamp(reviews.date, 'YYYY'),
//       'reviewer_name', reviews.reviewer_name,
//       'helpfulness', reviews.helpfulness
//     )) as results FROM reviews where product_id = 25167



  // create: function (callback, req) {
  //   console.log('LOOK HERE', req.body);
  //   db.query('INSERT INTO messages (text, username, roomname) VALUES (?, ?, ?)', [req.query.message, req.query.username, req.query.roomname], (err, results) => {
  //     if (err) {
  //       callback(err);
  //     } else {
  //       callback(null, results);
  //     }
  //   });
  // } // a function which can be used to insert a message into the database
};
