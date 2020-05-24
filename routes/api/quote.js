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
      `https://finnhub.io/api/v1/quote?symbol=${stock}&token=br4ipfnrh5r8ufeotdd0`
    );
    const quote = response.data.c;
    res.json({ quote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
