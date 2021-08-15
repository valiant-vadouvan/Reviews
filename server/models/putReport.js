const db = require('../db');

module.exports = {
  reportReview: ({ review_id }) => {
    const query = { text: 'UPDATE reviews SET reported = true WHERE id = $1;', values: [review_id] }
    return db.query(query);
  }
};
