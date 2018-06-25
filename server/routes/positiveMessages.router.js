const router = require('express').Router();
const pool = require('../modules/pool');

// prep motivational messages (pre-timer)
router.get('/before', (req, res) => {
  console.log('GET /api/positiveMessage/before');
  if (req.isAuthenticated()) {
      const query = `
      SELECT *
      FROM "positive_messages"
      WHERE "message_type" = 'before'
      `;
      pool.query(query)
      .then(results => {
          res.send(results.rows);
      })
      .catch(error => {
          res.sendStatus(500);
      })
  } else {
      res.sendStatus(403);
  }
})

// completed entry motivational messages (post-timer)
router.get('/after', (req, res) => {
  console.log('GET /api/positiveMessage/before');
  if (req.isAuthenticated()) {
      const query = `
      SELECT *
      FROM "positive_messages"
      WHERE "message_type" = 'after'
      `;
      pool.query(query)
      .then(results => {
          res.send(results.rows);
      })
      .catch(error => {
          res.sendStatus(500);
      })
  } else {
      res.sendStatus(403);
  }
})

module.exports = router;