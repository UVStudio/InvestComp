const express = require('express');
const router = express.Router();
const StockSymbolLookup = require('stock-symbol-lookup');

//@route    GET /api/symbol/:id
//@desc     search for symbols with company name keyword
//@access:  public

router.get('/:id', async (req, res) => {
  const security = req.params.id;
  const securityUpper = security.toUpperCase();
  try {
    const response = await StockSymbolLookup.loadData().then((data) => {
      return data;
    });
    const securitiesArray = response.securities;

    let securitiesArrayUpper = [];
    for (const e of securitiesArray) {
      //not every security has a securityName!!!!!!!
      if (e.securityName) {
        let securityNameUpper = e.securityName.toUpperCase();
        securitiesArrayUpper.push({
          symbol: e.symbol,
          securityName: securityNameUpper,
        });
      }
    }

    let stock = [];
    for (const e of securitiesArrayUpper) {
      //not every security has a securityName!!!!!!!
      if (e.securityName && e.securityName.includes(securityUpper)) {
        stock.push(e);
      }
    }
    res.json({ stock });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET /api/symbol/
//@desc     get list of all symbols
//@access:  public

router.get('/', async (req, res) => {
  try {
    const response = await StockSymbolLookup.loadData().then((data) => {
      return data;
    });
    const securitiesArray = response.securities;
    const symbolList = securitiesArray.map((e) => e.symbol);
    res.json({ symbolList });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
