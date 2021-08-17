const db = require('../db');
const _ = require('underscore');

module.exports = {
  getReviews: (queryParams, callback) => {
    const { product, count, page, sort } = queryParams;
    let sortQuery;
    if (sort === 'helpful') {
      sortQuery = 'helpfulness DESC';
    } else if (sort === 'newest') {
      sortQuery = 'date DESC';
    }
    else if (sort === 'relevant') {
      sortQuery = 'date DESC'
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
    return db.query(query);
  },
  postReview: (reqBod) => {
    const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = reqBod;
    let date = Date.now();

    const photoEntries = photos.map((item) => `((SELECT review_id from insReviews), '${item}')`);
    const photoQueries = photoEntries.join(', ');

    const characteristicEntries = _.map(characteristics, (rating, char_id) => {
      return `(${char_id}, (SELECT review_id from insReviews), '${rating}')`;
    });
    const charQueries = characteristicEntries.join(', ') + ';';

    let qString = `
    WITH insReviews AS (
      INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id as review_id
    ),
    insPhotos AS (
      INSERT INTO photos(review_id, url)
      VALUES
        ${photoQueries}
    )
    INSERT INTO review_characteristics (characteristic_id, review_id, value)
    VALUES
      ${charQueries}`;

    const query = {
      text: qString,
      values: [product_id, rating, date, summary, body, recommend, name, email]
    };
    return db.query(query);
  }
};
