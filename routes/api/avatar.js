const express = require('express');
const router = express.Router();

//GET avatar
//access: private
router.get('/', (req, res) => {
  res.send('avatar');
});

module.exports = router;
