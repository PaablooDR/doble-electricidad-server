const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  holder_name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
