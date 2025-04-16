const express = require('express');
const SliderController = require('../controllers/SliderController');
const router = express.Router();

router.get('/', SliderController.getAllSliders);
router.get('/:id', SliderController.getSliderById);
router.post('/', SliderController.createSlider);
router.put('/:id', SliderController.updateSlider);
router.delete('/:id', SliderController.deleteSlider);

module.exports = router;