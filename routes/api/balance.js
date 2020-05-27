const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const axios = require('axios');

//@route  PUT /api/balance/
//@desc   update the current balance of logged in profile's portfolio
//@access private

router.put('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.profile.id });
    const ppe = profile.portfolio.equity;

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

      const stockToQuote = ppe[i].stock;
      //run quote to find current share prices of each of these stocks
      const quote = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockToQuote}&token=br4ipfnrh5r8ufeotdd0`
      );

      //populate the share update object
      const shareObj = {};
      const stockQuote = quote.data.c;
      shareObj.stock = ppe[i].stock;
      shareObj.shares = sharesOfStock;
      shareObj.price = stockQuote;
      shareObj.balance = stockQuote * sharesOfStock;
      sharesArray.push(shareObj);
      //record new balance and stock price onto profile
      ppe[i].balance = stockQuote * sharesOfStock;
      ppe[i].price = stockQuote;
    }
    //calculate profile balance (equity + cash)
    const equityBalance = sharesArray.map((e) => e.balance).reduce(reducer);
    profile.portfolio.profileBalance = equityBalance + profile.portfolio.cash;
    await profile.save();
    res.json({ profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
