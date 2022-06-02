const express = require('express');

const website = require('./routes/website/website.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/buildWebsite', website);

module.exports = router;
