const pool = require('../config'); // Import the database connection pool
const bcrypt = require('bcrypt');

const User = {
    getAll: async () => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM users');
                return rows;
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
                return rows[0];
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error getting user with id ${id}:`, error);
            throw error;
        }
    },

    create: async (userData) => {
        const { user_name, user_email, user_password, user_phone, user_country, role } = userData;
        try {
            const connection = await pool.getConnection();
            try{
                const [existingUsers] = await connection.execute(
                    'SELECT * FROM users WHERE user_email = ?',
                    [user_email]
                );

                if (existingUsers.length > 0) {
                    throw new Error('User already exists');
                }

                const hashedPassword = await bcrypt.hash(user_password, 10);
                const [result] = await connection.execute(
                    'INSERT INTO users (user_name, user_email, user_password, user_phone, user_country, role) VALUES (?, ?, ?, ?, ?, ?)',
                    [user_name, user_email, hashedPassword, user_phone, user_country, role]
                );
                return { id: result.insertId, ...userData };
            }finally{
                connection.release();
            }
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    update: async (id, userData) => {
        const { user_name, user_email, user_password, user_phone, user_country, role } = userData;
        try {
            const connection = await pool.getConnection();
            try{
                const [existingUsers] = await connection.execute(
                    'SELECT * FROM users WHERE user_email = ? AND id != ?',
                    [user_email, id]
                );

                if (existingUsers.length > 0) {
                    throw new Error('User with this email already exists');
                }
                let hashedPassword = user_password;
                if(user_password){
                    hashedPassword = await bcrypt.hash(user_password, 10);
                }
                await connection.execute(
                    'UPDATE users SET user_name = ?, user_email = ?, user_password = ?, user_phone = ?, user_country = ?, role = ? WHERE id = ?',
                    [user_name, user_email, hashedPassword, user_phone, user_country, role, id]
                );
                return { id, ...userData };
            }finally{
                connection.release();
            }
        } catch (error) {
            console.error(`Error updating user with id ${id}:`, error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const connection = await pool.getConnection();
            try {
                await connection.execute('DELETE FROM users WHERE id = ?', [id]);
                return { message: 'User deleted successfully' };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(`Error deleting user with id ${id}:`, error);
            throw error;
        }
    }
};

module.exports = User;