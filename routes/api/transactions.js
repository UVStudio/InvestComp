const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const axios = require('axios');
const { check, validationResult } = require('express-validator');

//@route    POST /api/transactions/buy
//@desc     post buy transactions
//@access   private

router.post(
  '/buy',
  auth,
  [
    check('buysell', 'Buysell is required').not().isEmpty(),
    check('amount', 'Amount is required.').not().isEmpty(),
    check('stock', 'Stock is required.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { buysell, amount, stock } = req.body;
    console.log(stock);

    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${stock}&token=br4ipfnrh5r8ufeotdd0`
    );
    console.log(response.data.c);

    const price = response.data.c;
    const shares = amount / price;
    console.log(shares);

    //build equity object
    const equityObj = {
      stock,
    };

    //build transaction Object
    const transactionDetails = {};
    transactionDetails.buysell = buysell;
    transactionDetails.amount = amount;
    transactionDetails.stock = stock;
    transactionDetails.price = price;
    transactionDetails.shares = shares;

    try {
      const profile = await Profile.findOne({ _id: req.profile.id });

      const cash = profile.portfolio.cash;
      if (cash < amount) {
        return res.send('You do not have enough cash.');
      }

      const ppe = profile.portfolio.equity;

      //add stock obj into array of equities
      const findCompany = (e) => e.stock === stock;
      if (!ppe.some(findCompany)) {
        ppe.push(equityObj);
      }
      //if equity element exists, push transaction obj into equity
      const result = ppe.findIndex(findCompany);
      ppe[result].transactions.push(transactionDetails);

      //recalculate shares balance
      const reducer = (acc, curr) => acc + curr;
      const transactionList = ppe[result].transactions;
      const sharesArray = transactionList.map((e) => e.shares);
      const shareBalance = sharesArray.reduce(reducer);
      console.log(shareBalance);

      //saving new shares balance to mongo
      ppe[result].shares = shareBalance;
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    POST /api/transactions/sell
//@desc     post sell transactions
//@access   private

router.post(
  '/sell',
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
      const profile = await Profile({ _id: req.profile.id });

      res.send(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    POST /api/transactions/cash
//@desc     add cash transactions
//@access   private

router.post('/cash', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.profile.id });
    const cash = req.body.cash;
    profile.portfolio.cash = cash;

    console.log(profile.portfolio.cash);
    await profile.save();
    res.send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

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
