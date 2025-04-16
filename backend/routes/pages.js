const express = require('express');
const PageController = require('../controllers/PageController');
const router = express.Router();

router.get('/', PageController.getAllPages);
router.get('/:id', PageController.getPageById);
router.post('/', PageController.createPage);
router.put('/:id', PageController.updatePage);
router.delete('/:id', PageController.deletePage);

module.exports = router;