const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'cancelled'],
    default: 'completed',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sale', saleSchema);
