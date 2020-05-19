const express = require('express');
const router = express.Router();
const axios = require('axios');

//@route    GET /api/quote/symbol
//@desc     get quotes from API bystock symbol
//@access:  public

router.get('/:id', async (req, res) => {
  const stock = req.params.id;
  try {
    const response = await axios.get(
      `https://cloud.iexapis.com/stable/tops?token=pk_f250b871bf214086b6b6ea70d2720091&symbols=${stock}`
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
  res.send('quote');
});

module.exports = router;
