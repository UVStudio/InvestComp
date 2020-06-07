const express = require('express');
const router = express.Router();
const axios = require('axios');
const StockSymbolLookup = require('stock-symbol-lookup');

//@route    GET /api/quote/symbol
//@desc     get quotes from API stock symbol
//@access:  public

// router.get('/:id', async (req, res) => {
//   const stock = req.params.id;
//   try {
//     const response = await axios.get(
//       `https://finnhub.io/api/v1/quote?symbol=${stock}&token=br4ipfnrh5r8ufeotdd0`
//     );
//     const quote = response.data.c;
//     res.json({ quote });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

//@route    GET /api/quote/:id
//@desc     get ticker symbol from company name
//@access:  public

router.get('/:id', async (req, res) => {
  const security = req.params.id;
  try {
    const response = await StockSymbolLookup.loadData().then((data) => {
      return data;
    });
    const securitiesArray = response.securities;
    let stock = [];
    for (const e of securitiesArray) {
      if (e.securityName && e.securityName.includes(security)) {
        stock.push(e.securityName);
      }
    }
    res.json({ stock });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
