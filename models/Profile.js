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
  },
  shares: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PortfolioSchema = new mongoose.Schema({
  equity: [
    {
      stock: {
        type: String,
      },
      transactions: [TransactionsSchema],
      shares: {
        type: Number,
      },
      price: {
        type: Number,
      },
      balance: {
        type: Number,
      },
    },
  ],
  cash: {
    type: Number,
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
  portfolio: PortfolioSchema,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
