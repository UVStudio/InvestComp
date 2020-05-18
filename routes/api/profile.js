const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

//@route    POST /api/profile
//@desc     register profile
//@access   Public
router.post(
  '/',
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
      let profile = await Profile.findOne({ email });
      if (profile) {
        return res
          .status(400)
          .json({ error: [{ msg: 'Profile already exists.' }] });
      }
      profile = new Profile({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      profile.password = await bcrypt.hash(password, salt);
      await profile.save();

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

//@route  GET /me
//@desc   get current logged in profile
//@access private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.profile.id });
    if (!profile) {
      return res.status(400).json({ msg: 'You are not authorized' });
    }
    res.json({ profile });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET /api/profile/:id
//@desc   get profile by profile id
//@access public

router.get('/:profile_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      _id: req.params.profile_id,
    }).populate('profile');
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this profile ID.' });
    }
    res.send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//@route  DELETE /api/profile
//@desc   remove profile
//@access private

router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findByIdAndRemove({ _id: req.profile.id });
    res.json({ msg: 'Profile removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
