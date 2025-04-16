const Partner = require('../models/Partner');

const PartnerController = {
    getAllPartners: async (req, res) => {
        try {
            const partners = await Partner.getAll();
            res.json(partners);
        } catch (error) {
            console.error('Error getting all partners:', error);
            res.status(500).json({ error: 'Error getting all partners' });
        }
    },

    getPartnerById: async (req, res) => {
        const id = req.params.id;
        try {
            const partner = await Partner.getById(id);
            if (!partner) {
                return res.status(404).json({ error: 'Partner not found' });
            }
            res.json(partner);
        } catch (error) {
            console.error('Error getting partner by ID:', error);
            res.status(500).json({ error: 'Error getting partner by ID' });
        }
    },

    createPartner: async (req, res) => {
        const partnerData = req.body;
        try {
            const newPartner = await Partner.create(partnerData);
            res.status(201).json({ message: 'Partner created successfully', partner: newPartner });
        } catch (error) {
            console.error('Error creating partner:', error);
            res.status(500).json({ error: 'Error creating partner' });
        }
    },

    updatePartner: async (req, res) => {
        const id = req.params.id;
        const partnerData = req.body;
        try {
            const updatedPartner = await Partner.update(id, partnerData);
            if (!updatedPartner) {
                return res.status(404).json({ error: 'Partner not found' });
            }
            res.json({ message: 'Partner updated successfully', partner: updatedPartner });
        } catch (error) {
            console.error('Error updating partner:', error);
            res.status(500).json({ error: 'Error updating partner' });
        }
    },

    deletePartner: async (req, res) => {
        const id = req.params.id;
        try {
            await Partner.delete(id);
            res.json({ message: 'Partner deleted successfully' });
        } catch (error) {
            console.error('Error deleting partner:', error);
            res.status(500).json({ error: 'Error deleting partner' });
        }
    }
};

module.exports = PartnerController;