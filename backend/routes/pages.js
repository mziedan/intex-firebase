const express = require('express'); // Import the express library
const router = express.Router(); // Create a new router object
const PageController = require('../controllers/PageController'); // Import the PageController

// Define the routes for pages
router.get('/', PageController.getAllPages); // Route to get all pages
router.get('/:id', PageController.getPageById); // Route to get a page by id
router.post('/', PageController.createPage); // Route to create a page
router.put('/:id', PageController.updatePage); // Route to update a page
router.delete('/:id', PageController.deletePage); // Route to delete a page

module.exports = router; // Export the router