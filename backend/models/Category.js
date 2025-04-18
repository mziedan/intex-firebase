const pool = require('../config'); // Import the database connection pool

const Category = {
    getAll: async () => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM categories');
                return rows;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error getting all categories:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM categories WHERE id = ?', [id]);
                return rows[0];
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error getting category with id ${id}:`, error);
            throw error;
        }
    },

    create: async (categoryData) => {
        const { name, description, image, parent_category_id } = categoryData;
        try {
            const connection = await pool.getConnection();
            try {
                const [result] = await connection.execute(
                    'INSERT INTO categories (name, description, image, parent_category_id) VALUES (?, ?, ?, ?)',
                    [name, description, image, parent_category_id]
                );
                return { id: result.insertId, ...categoryData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    update: async (id, categoryData) => {
        const { name, description, image, parent_category_id } = categoryData;
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute(
                    'UPDATE categories SET name = ?, description = ?, image = ?, parent_category_id = ? WHERE id = ?',
                    [name, description, image, parent_category_id, id]
                );
                return { id, ...categoryData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error updating category with id ${id}:`, error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute('DELETE FROM categories WHERE id = ?', [id]);
                return { message: 'Category deleted successfully' };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error deleting category with id ${id}:`, error);
            throw error;
        }
    }
};

module.exports = Category;