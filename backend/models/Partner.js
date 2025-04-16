const pool = require('../config'); // Import the database connection pool

const Partner = {
    getAll: async () => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM partners');
                return rows;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error getting all partners:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM partners WHERE id = ?', [id]);
                return rows[0];
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error getting partner with id ${id}:`, error);
            throw error;
        }
    },

    create: async (partnerData) => {
        const { name, image, link } = partnerData;
        try {
            const connection = await pool.getConnection();
            try {
                const [result] = await connection.execute(
                    'INSERT INTO partners (name, image, link) VALUES (?, ?, ?)',
                    [name, image, link]
                );
                return { id: result.insertId, ...partnerData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error creating partner:', error);
            throw error;
        }
    },

    update: async (id, partnerData) => {
        const { name, image, link } = partnerData;
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute(
                    'UPDATE partners SET name = ?, image = ?, link = ? WHERE id = ?',
                    [name, image, link, id]
                );
                return { id, ...partnerData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error updating partner with id ${id}:`, error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute('DELETE FROM partners WHERE id = ?', [id]);
                return { message: 'Partner deleted successfully' };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error deleting partner with id ${id}:`, error);
            throw error;
        }
    }
};

module.exports = Partner;