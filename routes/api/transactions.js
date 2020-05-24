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

    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${stock}&token=br4ipfnrh5r8ufeotdd0`
    );

    const price = response.data.c;
    const shares = amount / price;

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
      console.log(ppe[result] + ':' + shareBalance);

      //minus from cash and save to mongo
      profile.portfolio.cash = profile.portfolio.cash - amount;

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
    check('stock', 'Stock is required.').not().isEmpty(),
    check('shares', 'Shares is required.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { buysell, stock, shares } = req.body;

    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${stock}&token=br4ipfnrh5r8ufeotdd0`
    );

    const price = response.data.c;
    const amount = shares * price;

    //build transaction Object
    const transactionDetails = {};
    transactionDetails.buysell = buysell;
    transactionDetails.amount = amount;
    transactionDetails.stock = stock;
    transactionDetails.price = price;
    transactionDetails.shares = shares;

    try {
      const profile = await Profile.findOne({ _id: req.profile.id });
      const ppe = profile.portfolio.equity;

      //make sure profile has the same stock
      const findCompany = (e) => e.stock === stock;
      if (!ppe.some(findCompany)) {
        return res.send('You do not have this stock');
      }

      //make sure profile has enough number of shares
      const result = ppe.findIndex(findCompany);
      if (ppe[result].shares < shares) {
        return res.send('You do not have enough shares');
      }

      //add transaction object to equity.transactions
      ppe[result].transactions.push(transactionDetails);

      //recalculate shares balance
      const reducer = (acc, curr) => acc + curr;
      const transactionList = ppe[result].transactions;
      const sharesArray = transactionList.map((e) => e.shares);
      const shareBalance = sharesArray.reduce(reducer);
      //console.log(ppe[result] + ':' + shareBalance);

      //add sales proceeds to cash and save to mongo
      profile.portfolio.cash = profile.portfolio.cash - amount;

      console.log(amount);
      console.log(profile.portfolio.cash);

      //saving new shares balance to mongo
      ppe[result].shares = shareBalance;

      await profile.save();
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
