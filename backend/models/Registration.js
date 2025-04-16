const pool = require('../config');

const Registration = {
    getAll: async () => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM registrations');
                return rows;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error getting all registrations:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM registrations WHERE id = ?', [id]);
                return rows[0];
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error getting registration with id ${id}:`, error);
            throw error;
        }
    },

    create: async (registrationData) => {
        const { course_id, user_name, user_email, session_id } = registrationData;
        try {
            const connection = await pool.getConnection();
            try {
                const [result] = await connection.execute(
                    'INSERT INTO registrations (course_id, user_name, user_email, session_id) VALUES (?, ?, ?, ?)',
                    [course_id, user_name, user_email, session_id]
                );
                return { id: result.insertId, ...registrationData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error creating registration:', error);
            throw error;
        }
    },

    update: async (id, registrationData) => {
        const { course_id, user_name, user_email, session_id } = registrationData;
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute(
                    'UPDATE registrations SET course_id = ?, user_name = ?, user_email = ?, session_id = ? WHERE id = ?',
                    [course_id, user_name, user_email, session_id, id]
                );
                return { id, ...registrationData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error updating registration with id ${id}:`, error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute('DELETE FROM registrations WHERE id = ?', [id]);
                return { message: 'Registration deleted successfully' };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error deleting registration with id ${id}:`, error);
            throw error;
        }
    }
};

module.exports = Registration;