const User = require('../models/User');

const bcrypt = require('bcrypt');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            try {
                const users = await User.getAll();
                return res.json(users);
            } finally {
              connection.release();
            }
        } catch (err) {
            console.error('Error getting users:', err);
            res.status(500).json({ error: 'Error getting users' });
        }
    },

    getUserById: async (req, res) => {
        const userId = req.params.id;
        try {
            const connection = await pool.getConnection();
            try {
                const user = await User.getById(userId);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.json(user);
            }finally{
                connection.release();
            }
        } catch (err) {
            console.error('Error getting user:', err);
            res.status(500).json({ error: 'Error getting user' });
        }
    },

    createUser: async (req, res) => {
        const { user_name, user_email, user_password, user_phone, user_country, role } = req.body;
        try {
            const connection = await pool.getConnection();
             const user = await User.create({
                user_name,
                user_email,
                user_password,
                user_phone,
                user_country,
                role
            });
            return res.status(201).json(user);

        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Error creating user' });
        }
    },

    updateUser: async (req, res) => {
        const userId = req.params.id;
        const { user_name, user_email, user_password, user_phone, user_country, role } = req.body;
        try {
            const user = await User.update(userId, {
                user_name,
                user_email,
                user_password,
                user_phone,
                user_country,
                role
            });
            try{
                res.json({ message: 'User updated successfully' });
            }finally{
                connection.release();
            }

        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Error updating user' });
        }
    },

    deleteUser: async (req, res) => {
        const userId = req.params.id;
        try {
            const connection = await pool.getConnection();
            try {
                await User.delete(userId);
                return res.json({ message: 'User deleted successfully' });
            } finally {
                connection.release();
            }
        } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Error deleting user' });
        }
    }
};

module.exports = UserController;
