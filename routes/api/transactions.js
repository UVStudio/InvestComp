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
    check('units', 'Units is required.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { buysell, amount, stock, price, units } = req.body;

    //build transaction Object
    const transactionDetails = {};
    //transactionDetails.profile = req.profile.id;
    transactionDetails.buysell = buysell;
    transactionDetails.amount = amount;
    transactionDetails.stock = stock;
    transactionDetails.price = price;
    transactionDetails.units = units;

    try {
      const profile = await Profile.findOne({ _id: req.profile.id });
      profile.transactions.push(transactionDetails);
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
