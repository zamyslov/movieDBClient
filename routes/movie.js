const express = require('express');
const controller = require('../controllers/movie');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', upload.single('image'), controller.create);
router.get('/:id', controller.getById);
router.get('/actor/:id', controller.getByActorId);
router.delete('/:id', controller.delete);
router.patch('/:id', upload.single('image'), controller.update);

module.exports = router;