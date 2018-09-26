const express = require('express');
const controller = require('../controllers/category');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.get);
router.delete('/:id', controller.delete);

module.exports = router;