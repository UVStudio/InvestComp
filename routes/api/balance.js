const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');

//@route  GET /api/balance/
//@desc   calculate balace of logged in profile's portfolio
//@access private

router.get('/', auth, async (req, res) => {
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
      const shareObj = {};
      shareObj.stock = ppe[i].stock;
      shareObj.shares = sharesOfStock;
      sharesArray.push(shareObj);
    }

    res.json(sharesArray);

    //run quote.js to find current share prices of each of these stocks
    //calculate value of each stock by multipling current price with number of shares
    //add value of each stock with cash value to find overall balance
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
