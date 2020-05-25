const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  administrator: {
    type: Boolean,
    required: true,
  },
});

module.exports = Admin = mongoose.model('Admin', AdminSchema);
