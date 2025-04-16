// backend/controllers/CategoryController.js
const Category = require('../models/Category');// Import the Category model
const CategoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.getAll();
            res.json(categories);
        } catch (err) {
            console.error('Error getting categories:', err);
            res.status(500).json({ error: 'Error getting categories' });
        }
    },

    getCategoryById: async (req, res) => {
        const categoryId = req.params.id;
        try {
            const category = await Category.getById(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (err) {
            console.error('Error getting category:', err);
            res.status(500).json({ error: 'Error getting category' });
        }
    },

    createCategory: async (req, res) => {
        const categoryData = req.body;
        try {
            const newCategory = await Category.create(categoryData);
            res.status(201).json(newCategory);
        } catch (err) {
            console.error('Error creating category:', err);
            res.status(500).json({ error: 'Error creating category' });
        }
    },

    updateCategory: async (req, res) => {
        const categoryId = req.params.id;
        const categoryData = req.body;
        try {
            const updatedCategory = await Category.update(categoryId, categoryData);
            res.json(updatedCategory);
        } catch (err) {
            console.error('Error updating category:', err);
            res.status(500).json({ error: 'Error updating category' });
        }
    },

    deleteCategory: async (req, res) => {
        const categoryId = req.params.id;
        try {
            await Category.delete(categoryId);
            res.json({ message: 'Category deleted successfully' });
        } catch (err) {
            console.error('Error deleting category:', err);
            res.status(500).json({ error: 'Error deleting category' });
        }
    }
};

module.exports = CategoryController;