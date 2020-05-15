const express = require('express');
const router = express.Router();

//GET transactions
//access: private
router.get('/', (req, res) => {
  res.send('transactions');
});

module.exports = router;
