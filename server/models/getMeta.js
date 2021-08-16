const db = require('../db');

module.exports = {
  getRatings: ({ product_id }) => {
    const query = {
      text:
      `SELECT json_build_object
      (rating, count(rating)) as ratingCount
      FROM reviews WHERE product_id = $1 GROUP BY rating ORDER BY rating;`,
      values: [product_id]
    };
    return db.query(query);
  },
  getRecommend: ({ product_id }) => {
    const query = {
      text:
      `SELECT json_build_object
      (recommend, count(recommend)) as recommend
      FROM reviews WHERE product_id = $1 GROUP BY recommend;`,
      values: [product_id]
    };
    return db.query(query);
  },
  getCharacteristics: ({ product_id }) => {
    const query = {
      text:
      `SELECT json_build_object(
        name, json_build_object(
          'id', characteristic_id,
          'value', avg(value)
          )
        ) as chars
      FROM characteristics
      INNER JOIN review_characteristics
      ON characteristics.id = characteristic_id
      WHERE product_id = ${product_id}
      GROUP BY name, characteristic_id;`
    };
    return db.query(query);
  }
};
