const express = require('express');
const router = express.Router();
const PartnerController = require('../controllers/PartnerController');

router.get('/', PartnerController.getAllPartners);
router.get('/:id', PartnerController.getPartnerById);
router.post('/', PartnerController.createPartner);
router.put('/:id', PartnerController.updatePartner);
router.delete('/:id', PartnerController.deletePartner);

module.exports = router;