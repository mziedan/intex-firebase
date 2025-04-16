const express = require('express'); // Import express
const SessionController = require('../controllers/SessionController'); // Import the SessionController

const router = express.Router(); // Create a new router instance

router.get('/', SessionController.getAllSessions); // Route to get all sessions
router.get('/:id', SessionController.getSessionById); // Route to get a session by ID
router.post('/', SessionController.createSession); // Route to create a new session
router.put('/:id', SessionController.updateSession); // Route to update a session
router.delete('/:id', SessionController.deleteSession); // Route to delete a session

module.exports = router; // Export the router