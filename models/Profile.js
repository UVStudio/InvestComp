const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
  buysell: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files',
  },
  location: {
    type: String,
  },
  transactions: [TransactionsSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
