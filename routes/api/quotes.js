const express = require('express');
const router = express.Router();

//GET quotes
//access: public
router.get('/', (req, res) => {
  res.send('quotes');
});

module.exports = router;
