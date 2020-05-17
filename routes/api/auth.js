const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//GET api/auth
//access: private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.profile.id).select('-password');
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//POST api/auth
//authenticate profile, login, and get token
//access: private
router.post(
  '/',
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
      let profile = await Profile.findOne({ email });
      if (!profile) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid credentials.' }] });
      }

      const isMatch = await bcrypt.compare(password, profile.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid credentials.' }] });
      }

      const payload = {
        profile: {
          id: profile.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
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

module.exports = router;
