// backend/models/Slider.js 
const pool = require('../config'); // Import the database connection pool 

const Slider = {
    getAll: async () => {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('SELECT * FROM slider');
            connection.release();
            return rows;
        } catch (error) {
            console.error('Error getting all sliders:', error);
            throw error;
        }
    },

    getById: async (id) => { 
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute('SELECT * FROM slider WHERE id = ?', [id]);
            connection.release();
            return rows[0];
        } catch (error) {
            console.error(`Error getting slider with id ${id}:`, error);
            throw error;
        }
    },

     create: async (sliderData) => {
         const { image, quote } = sliderData;
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.execute(
                 'INSERT INTO slider (image, quote) VALUES (?, ?)',
                [image, quote]
            );
            connection.release();
            return { id: result.insertId, ...sliderData };
        } catch (error) {
            console.error('Error creating slider:', error);
            throw error;
        }
    },

    update: async (id, sliderData) => { 
         const { image, quote } = sliderData;
        try {
            const connection = await pool.getConnection();
            await connection.execute(
                 'UPDATE slider SET image = ?, quote = ? WHERE id = ?',
                [image, quote, id]
            );
            connection.release();
            return { id, ...sliderData };
        } catch (error) {
            console.error(`Error updating slider with id ${id}:`, error);
            throw error;
        }
    },

     delete: async (id) => {
        try {
            const connection = await pool.getConnection();
             await connection.execute('DELETE FROM slider WHERE id = ?', [id]);
            connection.release();
            return { message: 'Slider deleted successfully' };
        } catch (error) {
            console.error(`Error deleting slider with id ${id}:`, error);
            throw error;
        }
    }
};

module.exports = Slider; 