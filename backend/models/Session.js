const pool = require('../config'); // Import the database connection pool

const Session = {
    getAll: async () => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM sessions');
                return rows;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error getting all sessions:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM sessions WHERE id = ?', [id]);
                return rows[0];
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error getting session with id ${id}:`, error);
            throw error;
        }
    },

    create: async (sessionData) => {
        const { course_id, location, timeslot } = sessionData;
        try {
            const connection = await pool.getConnection();
            try {
                const [result] = await connection.execute(
                    'INSERT INTO sessions (course_id, location, timeslot) VALUES (?, ?, ?)',
                    [course_id, location, timeslot]
                );
                return { id: result.insertId, ...sessionData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error creating session:', error);
            throw error;
        }
    },

    update: async (id, sessionData) => {
        const { course_id, location, timeslot } = sessionData;
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute(
                    'UPDATE sessions SET course_id = ?, location = ?, timeslot = ? WHERE id = ?',
                    [course_id, location, timeslot, id]
                );
                return { id, ...sessionData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error updating session with id ${id}:`, error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute('DELETE FROM sessions WHERE id = ?', [id]);
                return { message: 'Session deleted successfully' };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error deleting session with id ${id}:`, error);
            throw error;
        }
    }
};

module.exports = Session;
