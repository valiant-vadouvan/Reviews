// import controllers, instantiate router
const controller = require('./controllers');
const router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/reviews', controller.reviews.get);

router.put('/reviews', controller.reviews.putHelpful);

// router.post('/reviews', controller

module.exports = router;
