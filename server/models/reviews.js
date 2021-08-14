var db = require('../db');

module.exports = {
  getReviews: (queryParams, callback) => {
    const { product, count, page, sort } = queryParams;
    let sortQuery;
    if (sort === 'helpful') {
      sortQuery = 'helpfulness DESC';
    } else if (sort === 'newest') {
      sortQuery = 'date';
    }
    else if (sort === 'relevant') {
      sortQuery = 'date ASC'
    }
    const query = {
      text: `SELECT
            reviews.id as review_id,
            rating,
            summary,
            recommend,
            response,
            body,
            to_timestamp(date/1000) as date,
            reviewer_name,
            helpfulness,
            array_agg(
              json_build_object(
               'id', photos.id,
               'url', url
               )) as photos
            FROM reviews
            INNER JOIN photos ON reviews.id = photos.review_id
            WHERE product_id = $1 and reported = false
            GROUP BY reviews.id
            ORDER BY ${sortQuery}
            LIMIT $2
            OFFSET $3;`,
      values: [product, count, page],
    };

    db.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
    });
  },
  incrementHelpfulness: ({ review_id }) => {
    const query = { text: `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1;`, values: [review_id] }
    return db.query(query);
  }


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
