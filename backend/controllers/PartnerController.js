const mysql = require('mysql2/promise');
const config = require('../config');

const PartnerController = {
  getAllPartners: async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(config);
      const [rows] = await connection.execute('SELECT * FROM partners');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching partners:', error);
      res.status(500).send('Error fetching partners');
    } finally {
      if (connection) connection.end();
    }
  },

  getPartnerById: async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
      connection = await mysql.createConnection(config);
      const [rows] = await connection.execute('SELECT * FROM partners WHERE id = ?', [parseInt(id)]);
      if (rows.length === 0) {
        res.status(404).send('Partner not found');
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error('Error fetching partner:', error);
      res.status(500).send('Error fetching partner');
    } finally {
      if (connection) connection.end();
    }
  },

  createPartner: async (req, res) => {
    const { name, link } = req.body;
    let image = '';

    if (req.files && req.files.image) {
      const file = req.files.image;
      console.log('Simulating uploading file: ', file.name);
      image = file.name; // Simulate storing file name in database
    }


    let connection;
    try {
      connection = await mysql.createConnection(config);
      const [result] = await connection.execute('INSERT INTO partners (name, image, link) VALUES (?, ?, ?)', [name, image, link]);
      res.status(201).json({ id: result.insertId, name, image, link });
    } catch (error) {
      console.error('Error creating partner:', error);
      res.status(500).send('Error creating partner');
    } finally {
      if (connection) connection.end();
    }
  },

  updatePartner: async (req, res) => {
    const { id } = req.params;
    const { name, link } = req.body;
    let image = '';

    if (req.files && req.files.image) {
      const file = req.files.image;
      console.log('Simulating uploading file: ', file.name);
      image = file.name; // Simulate storing file name in database
    }
    let connection;
    try {
      connection = await mysql.createConnection(config);
      await connection.execute('UPDATE partners SET name = ?, image = ?, link = ? WHERE id = ?', [name, image, link, parseInt(id)]);
      res.json({ id, name, image, link });
    } catch (error) {
      console.error('Error updating partner:', error);
      res.status(500).send('Error updating partner');
    } finally {
      if (connection) connection.end();
    }
  },

  deletePartner: async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
      connection = await mysql.createConnection(config);
      await connection.execute('DELETE FROM partners WHERE id = ?', [parseInt(id)]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting partner:', error);
      res.status(500).send('Error deleting partner');
    } finally {
      if (connection) connection.end();
    }
  },
};

module.exports = PartnerController;