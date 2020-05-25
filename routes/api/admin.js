const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const Admin = require('../../models/Admin');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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

//@route    POST /api/admin/login
//@desc     profile login, and get token
//@access   private

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
