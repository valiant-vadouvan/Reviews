var db = require('../db');

module.exports = {
  getReviews: (queryParams, callback) => {
    const { product, count, page, sort } = queryParams;
    let sortQuery;
    if (sort === 'helpful') {
      sortQuery = 'helpfulness DESC';
    } else if (sort === 'newest') {
      sortQuery = 'date ASC';
    }
    // else if (sort === 'relevant') {
    //   sortQuery = 'date ASC'
    // }
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
  postReview: (reqBod) => {
    console.log('req body', reqBod);
    const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = reqBod;
    let date = /*timestamp of now in unix or whatever*/ '1615928595216';
    const qString = `
    WITH insReviews AS (
      INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id as review_id
    ),
    insPhotos AS (
      -- loop for each photo in array
      INSERT INTO photos(review_id, url)
      SELECT review_id, 'http://reallyfakephoto.com' from insReviews
    )
    -- loop over characteristics on req.body, hit an insert for each one. will prob have to concat two variables then combine into query text property
    INSERT INTO review_characteristics (characteristic_id, review_id, value)
    SELECT 84234, review_id, 2 from insReviews;`

    const query = { text: 'INSERT', values: [product_id, rating, date, summary, body, recommend, name, email, photos, characteristics] }
    return db.query(query);
  },
  incrementHelpfulness: ({ review_id }) => {
    const query = { text: 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1;', values: [review_id] }
    return db.query(query);
  },
  reportReview: ({ review_id }) => {
    const query = { text: 'UPDATE reviews SET reported = true WHERE id = $1;', values: [review_id] }
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
