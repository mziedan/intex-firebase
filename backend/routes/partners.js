const express = require('express');
const PartnerController = require('../controllers/PartnerController');
const router = express.Router();

router.get('/', PartnerController.getAllPartners);
router.post('/', PartnerController.createPartner);
router.put('/:id', PartnerController.updatePartner);
router.delete('/:id', PartnerController.deletePartner);

module.exports = router;