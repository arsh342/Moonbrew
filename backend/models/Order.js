const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentDetails: {
    method: String,
    status: String,
    transactionId: String,
    timestamp: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema); 