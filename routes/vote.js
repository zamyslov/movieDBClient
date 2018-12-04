const express = require('express');
const controller = require('../controllers/vote');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/movie/:id', controller.getByMovieId);
router.get('/user/movie/:id/', controller.getByMovieAndUserId);
router.delete('/:id', controller.delete);

module.exports = router;