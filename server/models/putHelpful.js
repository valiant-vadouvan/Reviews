const db = require('../db');

module.exports = {
  incrementHelpfulness: ({ review_id }) => {
    const query = { text: 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1;', values: [review_id] }
    return db.query(query);
  }
};
