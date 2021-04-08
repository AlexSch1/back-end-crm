const passport = require('passport');
const router = require('express').Router();
const controller = require('../controllers/category');
const upload = require('../middelware/upload');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'),  controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'),  controller.update);

module.exports = router;
