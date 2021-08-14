// import controllers, instantiate router
const controller = require('./controllers');
const router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/reviews', controller.reviews.get);

router.put('/reviews/:review_id/helpful', controller.reviews.putHelpful);

router.put('/reviews/:review_id/report', controller.reviews.putReport);

// router.post('/reviews', controller

module.exports = router;
