const express = require('express'); // Import the express library
const router = express.Router(); // Create a new router object
const UserController = require('../controllers/UserController'); // Import the UserController

// Define the routes for the users
router.get('/', UserController.getAllUsers); // GET all users
router.get('/:id', UserController.getUserById); // GET user by id
router.post('/', UserController.createUser); // POST create a user
router.put('/:id', UserController.updateUser); // PUT update a user
router.delete('/:id', UserController.deleteUser); // DELETE delete a user

// Export the router
module.exports = router; 