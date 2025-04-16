const Page = require('../models/Page');

const PageController = {

    getAllPages: async (req, res) => {
        try {
            const pages = await Page.getAll();
            res.json(pages);
        } catch (error) {
            console.error('Error getting all pages:', error);
            res.status(500).json({ error: 'Error getting all pages' });
        }
    },

    getPageById: async (req, res) => {
        const pageId = req.params.id;
        try {
            const page = await Page.getById(pageId);
            if (!page) {
                return res.status(404).json({ error: 'Page not found' });
            }
            res.json(page);
        } catch (error) {
            console.error('Error getting page by id:', error);
            res.status(500).json({ error: 'Error getting page by id' });
        }
    },

    createPage: async (req, res) => {
        const pageData = req.body;
        try {
            const createdPage = await Page.create(pageData);
            res.status(201).json({ message: 'Page created successfully', page: createdPage });
        } catch (error) {
            if (error.message === 'Page title already exists') {
                return res.status(400).json({ error: error.message });
            }
            console.error('Error creating page:', error);
            res.status(500).json({ error: 'Error creating page' });
        }
    },

    updatePage: async (req, res) => {
        const pageId = req.params.id;
        const pageData = req.body;
        try {
            const updatedPage = await Page.update(pageId, pageData);
            res.json({ message: 'Page updated successfully', page: updatedPage });
        } catch (error) {
            if (error.message === 'Page title already exists') {
                return res.status(400).json({ error: error.message });
            }
            console.error('Error updating page:', error);
            res.status(500).json({ error: 'Error updating page' });
        }
    },

    deletePage: async (req, res) => {
        const pageId = req.params.id;
        try {
            await Page.delete(pageId);
            res.json({ message: 'Page deleted successfully' });
        } catch (error) {
            console.error('Error deleting page:', error);
            res.status(500).json({ error: 'Error deleting page' });
        }
    }
};

module.exports = PageController;