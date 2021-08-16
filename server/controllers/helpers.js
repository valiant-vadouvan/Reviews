const ratingBuilder = (rows, obj) => {
  rows.forEach((item) => Object.assign(obj.ratings, item.ratingcount));
};

const recommendedBuilder = (rows, obj) => {
  obj.recommend['0'] = rows[0].recommend.false || 0;
  obj.recommend['1'] = rows[1].recommend.true || 0;
};

const characteristicsBuilder = (rows, obj) => {
  rows.forEach((item) => Object.assign(obj.characteristics, item.chars));
};

module.exports = {
  ratingBuilder,
  recommendedBuilder,
  characteristicsBuilder
};
