const pool = require('../config');

const Course = {
    getAll: async () => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM courses');
                return rows;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error getting all courses:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM courses WHERE id = ?', [id]);
                return rows[0];
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error getting course with id ${id}:`, error);
            throw error;
        }
    },

    create: async (courseData) => {
        const { category_id, code, name, duration, description, image } = courseData;
        try {
            const connection = await pool.getConnection();
            try {
                const [result] = await connection.execute(
                    'INSERT INTO courses (category_id, code, name, duration, description, image) VALUES (?, ?, ?, ?, ?, ?)',
                    [category_id, code, name, duration, description, image]
                );
                return { id: result.insertId, ...courseData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error creating course:', error);
            throw error;
        }
    },

    update: async (id, courseData) => {
        const { category_id, code, name, duration, description, image } = courseData;
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute(
                    'UPDATE courses SET category_id = ?, code = ?, name = ?, duration = ?, description = ?, image = ? WHERE id = ?',
                    [category_id, code, name, duration, description, image, id]
                );
                return { id, ...courseData };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error updating course with id ${id}:`, error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute('DELETE FROM courses WHERE id = ?', [id]);
                return { message: 'Course deleted successfully' };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error deleting course with id ${id}:`, error);
            throw error;
        }
    }
};

module.exports = Course;