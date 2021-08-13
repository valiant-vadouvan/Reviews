// import controllers, instantiate router
const controller = require('./controllers');
const router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/reviews', controller.reviews.get);

// router.post('/reviews', controller

module.exports = router;
