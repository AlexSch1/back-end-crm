const passport = require('passport');
const router = require('express').Router();
const controller = require('../controllers/analytics');

router.get('/overview', passport.authenticate('jwt', {session: false}), controller.overview);
router.get('/analytics', passport.authenticate('jwt', {session: false}),controller.analytics);

module.exports = router;
