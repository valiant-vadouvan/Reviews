// import controllers, instantiate router
const controller = require('./controllers');
const router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/reviews', controller.reviews.get);

router.post('/reviews', controller.reviews.post);

router.get('/reviews/meta', controller.meta.get);

router.put('/reviews/:review_id/helpful', controller.helpful.put);

router.put('/reviews/:review_id/report', controller.report.put);


module.exports = router;
