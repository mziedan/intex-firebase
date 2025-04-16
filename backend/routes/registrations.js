// backend/routes/registrations.js

const express = require('express'); // Import express
const router = express.Router(); // Create a router
const RegistrationController = require('../controllers/RegistrationController'); // Import the controller

// GET all registrations
router.get('/', RegistrationController.getAllRegistrations); // Use the controller function

// GET a registration by ID
router.get('/:id', RegistrationController.getRegistrationById); // Use the controller function

// POST a new registration
router.post('/', RegistrationController.createRegistration); // Use the controller function

// PUT (update) a registration
router.put('/:id', RegistrationController.updateRegistration); // Use the controller function

// DELETE a registration
router.delete('/:id', RegistrationController.deleteRegistration); // Use the controller function

module.exports = router; // Export the router