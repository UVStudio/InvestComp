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
    const { name, email, password, administrator } = req.body;
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
        administrator,
      });

      console.log(admin);
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
//@desc     profile login, and get token
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

//@route    GET /api/admin/test
//@desc     test route
//@access   private

router.get('/test', adminAuth, async (req, res) => {
  return res.send('test route');
});

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

//@route    GET /api/admin/transactions/:id
//@desc     testing
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
            deletedTransObj.amount = ppe[i].transactions[j].amount;
            //deleting transactio
            ppe[i].transactions.splice(j, 1);
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

//@route  GET /api/balance/:profile_id
//@desc   get the current balance of logged in profile's portfolio
//@access private

router.get('/balance/:profile_id', adminAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.profile_id });
    const cash = profile.portfolio.cash;
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
    console.log(cash);
    res.json({ sharesArray });

    //add value of each stock with cash value to find overall balance
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
