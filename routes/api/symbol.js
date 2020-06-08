const express = require('express');
const router = express.Router();
const StockSymbolLookup = require('stock-symbol-lookup');

//@route    GET /api/symbol/:id
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
        stock.push(e);
      }
    }
    res.json({ stock });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
