const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users');
    res.status(200).json({
      status: 'success',
      data: {
        users: results.rows,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
