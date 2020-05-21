const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

//@route    POST /api/transactions/record
//@desc     post transactions
//@access   private

router.post(
  '/record',
  auth,
  [
    check('buysell', 'Buysell is required').not().isEmpty(),
    check('amount', 'Amount is required.').not().isEmpty(),
    check('stock', 'Stock is required.').not().isEmpty(),
    check('price', 'Price is required.').not().isEmpty(),
    check('shares', 'Shares is required.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { buysell, amount, stock, price, shares } = req.body;

    //build equity object
    const equityObj = {
      stock,
    };

    //build transaction Object
    const transactionDetails = {};
    //transactionDetails.profile = req.profile.id;
    transactionDetails.buysell = buysell;
    transactionDetails.amount = amount;
    transactionDetails.stock = stock;
    transactionDetails.price = price;
    transactionDetails.shares = shares;

    try {
      const profile = await Profile.findOne({ _id: req.profile.id });
      const ppe = profile.portfolio.equity;
      //console.log(profile.portfolio.equity.length);
      const findCompany = (e) => e.stock === stock;
      if (!ppe.some(findCompany)) {
        ppe.push(equityObj);
      }
      //console.log(equityObj);
      //console.log(profile.portfolio.equity);
      //console.log(profile.portfolio.equity.length);
      // for (let i = 0; i < profile.portfolio.equity.length; i++) {
      //   console.log(profile.portfolio.equity.length);
      // }

      //profile.transactions.push(transactionDetails);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET /api/transactions/
//@desc     view logged in profile's transactions
//@access   private

router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.profile.id,
    });
    res.json(profile.transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
