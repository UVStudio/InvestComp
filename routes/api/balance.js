const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');

//@route  GET /api/balance/me
//@desc   calculate balace of logged in profile's portfolio
//@access private

router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.profile.id });

    //find out the different stocks the profile has
    const stocks = profile.transactions.map((transaction) => transaction.stock);
    const sorted = Array.from(new Set(stocks));
    res.json(sorted);

    // const sharesBalances = [];
    // for (let i = 0; i < sorted.length; i++) {
    //   for (let j = 0; j < profile.transactions.length; j++) {
    //     if(profile.transactions[j].stock === sorted[i])
    //   }
    // }

    //for each stock, calculate the number of shares - sort each stock into its own array

    //run quote.js to find current share prices of each of these stocks
    //calculate value of each stock by multipling current price with number of shares
    //add value of each stock with cash value to find overall balance
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
