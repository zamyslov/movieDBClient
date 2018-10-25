const express = require('express');
const controller = require('../controllers/user');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.delete('/:id', controller.delete);
router.patch('/:id', controller.update);


module.exports = router;