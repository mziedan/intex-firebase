const mysql = require('mysql2/promise');
const config = require('../config');

const SliderController = {
  // Get all slider items
  getAllSliderItems: async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(config);
      const [rows] = await connection.execute('SELECT * FROM slider');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching slider items:', error);
      res.status(500).send('Error fetching slider items');
    } finally {
      if (connection) connection.end();
    }
  },

  // Create a new slider item
  createSliderItem: async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(config);
        const { quote } = req.body;
        const image = req.body.image
        console.log('Received image upload request:', image);
        console.log('Received quote:', quote);
        const [result] = await connection.execute('INSERT INTO slider (image, quote) VALUES (?, ?)', [image, quote]);
        res.status(201).json({ id: result.insertId, image, quote });
    } catch (error) {
        console.error('Error creating slider item:', error);
        console.log('Received image upload request:', req.body);
        console.log('Received quote:', req.body.quote);
      res.status(500).send('Error creating slider item');
    } finally {
      if (connection) connection.end();
    }
  },

  // Update an existing slider item
  updateSliderItem: async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(config);
      const { id } = req.params;
        const { quote } = req.body;
        const image = req.body.image
        console.log('Received image upload request:', image);
        await connection.execute('UPDATE slider SET image = ?, quote = ? WHERE id = ?', [image, quote, id]);
      res.json({ id, image, quote });
    } catch (error) {
      console.error('Error updating slider item:', error);
      res.status(500).send('Error updating slider item');
    } finally {
      if (connection) connection.end();
    }
  },

  // Delete a slider item
  deleteSliderItem: async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(config);
      const { id } = req.params;
      await connection.execute('DELETE FROM slider WHERE id = ?', [id]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting slider item:', error);
      res.status(500).send('Error deleting slider item');
    } finally {
      if (connection) connection.end();
    }
  },
};

module.exports = SliderController;