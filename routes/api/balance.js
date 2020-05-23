const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const axios = require('axios');

//@route  GET /api/balance/
//@desc   get the current balance of logged in profile's portfolio
//@access private

router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.profile.id });
    let cash = profile.portfolio.cash;
    const ppe = profile.portfolio.equity;
    cash = 100000;

    //for each stock, calculate the number of shares
    const sharesArray = [];
    const reducer = (acc, curr) => acc + curr;

    for (let i = 0; i < ppe.length; i++) {
      const tobeReduced = [];
      for (let j = 0; j < ppe[i].transactions.length; j++) {
        for (const prop in ppe[i].transactions[j]) {
          if (prop === 'shares') {
            tobeReduced.push(ppe[i].transactions[j][prop]);
          }
        }
      }
      const sharesOfStock = tobeReduced.reduce(reducer);

      //populate array of shares
      //run quote.js to find current share prices of each of these stocks
      //calculate value of each stock by multipling current price with number of shares

      const stockToQuote = ppe[i].stock;
      //https://cloud.iexapis.com/stable/tops?token=pk_f250b871bf214086b6b6ea70d2720091&symbols=${stockToQuote}
      const quote = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockToQuote}&token=br4ipfnrh5r8ufeotdd0`
      );

      const shareObj = {};
      const stockQuote = quote.data.c;
      shareObj.stock = ppe[i].stock;
      shareObj.shares = sharesOfStock;
      shareObj.price = stockQuote;
      shareObj.balance = stockQuote * sharesOfStock;
      sharesArray.push(shareObj);
    }

    const sharesBalances = sharesArray.map((e) => e.balance);
    console.log(sharesBalances);
    const equityBalance = sharesBalances.reduce(reducer);
    console.log(equityBalance);
    console.log(equityBalance + cash);
    res.json(sharesArray);

    //add value of each stock with cash value to find overall balance
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//@route  POST /api/balance/
//@desc   calculate balance of logged in profile's portfolio
//@access private

module.exports = router;
