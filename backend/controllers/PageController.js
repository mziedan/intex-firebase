const mysql = require('mysql2/promise');
const config = require('../config');

const PageController = {
  getAllPages: async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(config);
      const [rows] = await connection.execute('SELECT * FROM pages');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).send('Error fetching pages');
    } finally {
      if (connection) connection.end();
    }
  },

  getPageById: async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
      connection = await mysql.createConnection(config);
      const [rows] = await connection.execute('SELECT * FROM pages WHERE id = ?', [parseInt(id)]);
      if (rows.length === 0) {
        return res.status(404).send('Page not found');
      }
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching page:', error);
      res.status(500).send('Error fetching page');
    } finally {
      if (connection) connection.end();
    }
  },

  createPage: async (req, res) => {
    const { title, content } = req.body;
    const image = req.body.image;
    console.log('createPage request body:', req.body);

    if (req.body.image) {
      console.log('Received image:', image);
    }
    let connection;
    try {
        connection = await mysql.createConnection(config);


        const [checkRows] = await connection.execute('SELECT * FROM pages WHERE title = ?', [title]);
        if (checkRows.length > 0) {
          return res.status(400).send('Page title already exists');
        }
        

        const [result] = await connection.execute('INSERT INTO pages (title, content, image) VALUES (?, ?, ?)', [title, content, image]);
        res.status(201).json({ id: result.insertId, title, content, image });
      } catch (error) {

      console.error('Error creating page:', error);
      res.status(500).send('Error creating page');
    } finally {
      if (connection) connection.end();
    }
  },

  updatePage: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.body.image;
    console.log('updatePage request body:', req.body);

    if (req.body.image) {
      console.log('Received image:', image);
    }
    let connection;
    try {
        connection = await mysql.createConnection(config);
        const [checkRows] = await connection.execute('SELECT * FROM pages WHERE title = ? AND id != ?', [title, parseInt(id)]);
        if (checkRows.length > 0) {
          return res.status(400).send('Page title already exists');
        }

        const [rows] = await connection.execute('SELECT * FROM pages WHERE id = ?', [parseInt(id)]);
        if (rows.length === 0) return res.status(404).send('Page not found');
        await connection.execute('UPDATE pages SET title = ?, content = ?, image = ? WHERE id = ?', [title, content, image, parseInt(id)]);
        res.json({ id: parseInt(id), title, content, image });
    } catch (error) {
      console.error('Error updating page:', error);
      res.status(500).send('Error updating page');
    } finally {
      if (connection) connection.end();
    }
  },

  deletePage: async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
        connection = await mysql.createConnection(config);
        const [rows] = await connection.execute('SELECT * FROM pages WHERE id = ?', [parseInt(id)]);
        if (rows.length === 0) return res.status(404).send('Page not found');
        await connection.execute('DELETE FROM pages WHERE id = ?', [parseInt(id)]);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting page:', error);
      res.status(500).send('Error deleting page');
    } finally {
      if (connection) connection.end();
    }
  },
};

module.exports = PageController;