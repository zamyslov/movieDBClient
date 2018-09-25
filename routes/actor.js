const express = require('express');
const controller = require('../controllers/actor');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.get);
router.delete('/:id', controller.delete);
router.patch('/:id', controller.update);

module.exports = router;