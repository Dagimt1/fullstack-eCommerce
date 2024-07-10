const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM products');
    res.status(200).json({
      status: 'success',
      data: {
        products: results.rows,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO products (name, description, price, category, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, category, stock]
    );
    res.status(201).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  try {
    const result = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category = $4, stock = $5 WHERE id = $6 RETURNING *',
      [name, description, price, category, stock, req.params.id]
    );
    res.status(200).json({
      status: 'success',
      data: {
        product: result.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.status(204).json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
