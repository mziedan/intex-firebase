const Registration = require('../models/Registration');

const RegistrationController = {
    getAllRegistrations: async (req, res) => {
        try {
            const registrations = await Registration.getAll();
            res.json(registrations);
        } catch (error) {
            console.error('Error getting all registrations:', error);
            res.status(500).json({ error: 'Error getting all registrations' });
        }
    },

    getRegistrationById: async (req, res) => {
        const id = req.params.id;
        try {
            const registration = await Registration.getById(id);
            if (!registration) {
                return res.status(404).json({ error: 'Registration not found' });
            }
            res.json(registration);
        } catch (error) {
            console.error(`Error getting registration with id ${id}:`, error);
            res.status(500).json({ error: 'Error getting registration' });
        }
    },

    createRegistration: async (req, res) => {
        const registrationData = req.body;
        try {
            const newRegistration = await Registration.create(registrationData);
            res.status(201).json(newRegistration);
        } catch (error) {
            console.error('Error creating registration:', error);
            res.status(500).json({ error: 'Error creating registration' });
        }
    },

    updateRegistration: async (req, res) => {
        const id = req.params.id;
        const registrationData = req.body;
        try {
            const updatedRegistration = await Registration.update(id, registrationData);
            if (!updatedRegistration) {
                return res.status(404).json({ error: 'Registration not found' });
            }
            res.json(updatedRegistration);
        } catch (error) {
            console.error(`Error updating registration with id ${id}:`, error);
            res.status(500).json({ error: 'Error updating registration' });
        }
    },

    deleteRegistration: async (req, res) => {
        const id = req.params.id;
        try {
            await Registration.delete(id);
            res.json({ message: 'Registration deleted successfully' });
        } catch (error) {
            console.error(`Error deleting registration with id ${id}:`, error);
            res.status(500).json({ error: 'Error deleting registration' });
        }
    }
};

module.exports = RegistrationController;
