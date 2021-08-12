const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  const reviews = mongoose.model('Reviews,' new mongoose.Schema({
    product_id: Number,
    rating: Number,
    summary: String,
    recommended: Boolean,
    response: String,
    body: String,
    date: String,
    reviewer_name: String,
    helpfulness: Number,
    reported: Boolean,
  }));

  const characteristics = mongoose.model('Characteristics', new mongoose.Schema({
    characteristic_name: String
  }));

  const review_characteristics = mongoose.model('Review Characteristics', new mongoose.Schema({
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reviews'
    },
    characteristic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Characteristics'
    },
    rating: Number
  }));

  const pictures = mongoose.model('Pictures', new mongoose.Schema({
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reviews'
    },
    photo_URL: String
  }));
});