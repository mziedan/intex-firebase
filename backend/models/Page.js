const pool = require('../config');

const Page = {
    getAll: async () => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM pages');
                return rows;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error getting all pages:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM pages WHERE id = ?', [id]);
                return rows[0];
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error getting page with id ${id}:`, error);
            throw error;
        }
    },

    create: async (pageData) => {
        const { title, content, image } = pageData;
        try {
            const connection = await pool.getConnection();
            try {
                const [result] = await connection.execute(
                    'INSERT INTO pages (title, content, image) VALUES (?, ?, ?)',
                    [title, content, image]
                );
                return { id: result.insertId, ...pageData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error creating page:', error);
            throw error;
        }
    },

    update: async (id, pageData) => {
        const { title, content, image } = pageData;
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute(
                    'UPDATE pages SET title = ?, content = ?, image = ? WHERE id = ?',
                    [title, content, image, id]
                );
                return { id, ...pageData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error updating page with id ${id}:`, error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute('DELETE FROM pages WHERE id = ?', [id]);
                return { message: 'Page deleted successfully' };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error deleting page with id ${id}:`, error);
            throw error;
        }
    }
};

module.exports = Page;