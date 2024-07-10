const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM orders WHERE user_id = $1', [req.user.id]);
    res.status(200).json({
      status: 'success',
      data: {
        orders: results.rows,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
