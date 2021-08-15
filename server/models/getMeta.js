const db = require('../db');

module.exports = {
  getMetaData: ({ product_id }) => {
    const query = {
      text:
      `SELECT json_build_object
      (rating, count(rating)) as meta
      FROM reviews WHERE product_id = $1 GROUP BY rating ORDER BY rating;`,
      values: [product_id]
    };
    return db.query(query);
  }
};
