const express = require('express');
const router = express.Router();

//GET profile
//access: public
router.get('/', (req, res) => {
  res.send('profile');
});

module.exports = router;
