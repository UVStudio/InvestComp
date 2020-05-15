const express = require('express');
const router = express.Router();

//GET auth
//access: private
router.get('/', (req, res) => {
  res.send('auth');
});

module.exports = router;
