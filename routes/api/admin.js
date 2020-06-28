const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const Admin = require('../../models/Admin');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');

//@route  GET api/auth
//@desc   read login profile
//@access private

router.get('/', adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST /api/admin/register
//@desc     register an admin
//@access   Public

router.post(
  '/register',
  [
    check('name', 'Name is mandatory.').not().isEmpty(),
    check('email', 'Email is mandatory.').isEmail(),
    check('password', 'Password must be at least 6 characters long.').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Admin already exists.' }] });
      }

      admin = new Admin({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();

      const payload = {
        admin: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        config.get('adminSecret'),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

//@route    POST /api/admin/login
//@desc     admin login, and get token
//@access   public

router.post(
  '/login',
  [
    check('email', 'Email is mandatory.').isEmail(),
    check('password', 'Password is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid credentials.' }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid credentials.' }] });
      }

      const payload = {
        admin: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        config.get('adminSecret'),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

//@route    GET /api/admin/shares
//@desc     Get each stock name and closing price of different companys shares held by all investors
//@access   private

router.get('/shares', adminAuth, async (req, res) => {
  const profiles = await Profile.find();

  //build array of different stocks that people own
  const sharesArray = [];
  for (const profile of profiles) {
    for (let i = 0; i < profile.portfolio.equity.length; i++) {
      if (profile.portfolio.equity[i].shares > 0) {
        sharesArray.push(profile.portfolio.equity[i].stock);
      }
    }
  }

  //find price of each stock and make new array with prices added
  const sharesPriceArray = [];
  try {
    for (let i = 0; i < sharesArray.length; i++) {
      const stockToQuote = sharesArray[i];
      const quote = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockToQuote}&token=br4ipfnrh5r8ufeotdd0`
      );
      const shareObj = {};
      const stockQuote = quote.data.c;
      shareObj.stock = sharesArray[i];
      shareObj.price = stockQuote;
      sharesPriceArray.push(shareObj);
    }
    res.json(sharesPriceArray);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//@route    DELETE /api/admin/:profile_id/transactions/:id
//@desc     delete transaction by profile Id and transaction Id
//@access   private

router.delete(
  '/:profile_id/transactions/:transaction_id',
  adminAuth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ _id: req.params.profile_id });
      const ppe = profile.portfolio.equity;
      const deletedTransObj = {};
      for (let i = 0; i < ppe.length; i++) {
        for (let j = 0; j < ppe[i].transactions.length; j++) {
          if (ppe[i].transactions[j]._id == req.params.transaction_id) {
            //saving cash amount of transaction to be deleted
            if (deletedTransObj.buysell === 'buy') {
              deletedTransObj.amount = ppe[i].transactions[j].amount * -1;
            }
            deletedTransObj.amount = ppe[i].transactions[j].amount;
            //deleting transaction
            ppe[i].transactions.splice(j, 1);

            // recalculate shares balance - this step should not be necessary. should refresh account instead.
            // const reducer = (acc, curr) => acc + curr;
            // const transactionList = ppe[i].transactions;
            // const sharesArray = transactionList.map((e) => e.shares);
            // const shareBalance = sharesArray.reduce(reducer);
            // ppe[i].shares = shareBalance;
          }
        }
      }

      //re-calculate cash
      profile.portfolio.cash = profile.portfolio.cash + deletedTransObj.amount;
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  PUT /api/admin/balance/:profile_id
//@desc   Update the current balance of logged in profile's portfolio
//@access private

router.put('/balance/:profile_id', adminAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.profile_id });
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
      //run quote.js to find current share prices of each of these stocks
      //calculate value of each stock by multipling current price with number of shares

      const stockToQuote = ppe[i].stock;
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
      //record new balance onto profile
      ppe[i].balance = stockQuote * sharesOfStock;
    }
    //calculate profile balance (equity + cash)
    const equityBalance = sharesArray.map((e) => e.balance).reduce(reducer);
    profile.portfolio.profileBalance = equityBalance + profile.portfolio.cash;
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//@route  PUT /api/admin/balance
//@desc   Update the balances of all account users
//@access private

router.put('/balance', adminAuth, async (req, res) => {
  try {
    const profiles = await Profile.find();
    for (const profile of profiles) {
      const ppe = profile.portfolio.equity;

      //for each stock, calculate the number of shares
      const sharesArray = [];

      for (let i = 0; i < ppe.length; i++) {
        const tobeReduced = [];
        for (let j = 0; j < ppe[i].transactions.length; j++) {
          for (const prop in ppe[i].transactions[j]) {
            if (prop === 'shares') {
              tobeReduced.push(ppe[i].transactions[j][prop]);
            }
          }
        }

        let sharesOfStock;
        if (tobeReduced.length > 0) {
          sharesOfStock = tobeReduced.reduce((a, b) => a + b);
        }

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
      let equityBalance = 0;
      if (sharesArray.length > 0) {
        equityBalance = sharesArray
          .map((e) => e.balance)
          .reduce((a, b) => a + b);
      }

      profile.portfolio.profileBalance = equityBalance + profile.portfolio.cash;

      await profile.save();
    }
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//@route    POST /api/admin/cash
//@desc     add cash transactions
//@access   private

router.post('/cash', adminAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.profile.id });
    const cash = req.body.cash;
    profile.portfolio.cash = cash;
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  DELETE /api/admin/:profile_id
//@desc   remove profile
//@access private

router.delete('/:profile_id', adminAuth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ _id: req.params.profile_id });
    res.json({ msg: 'Profile removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
