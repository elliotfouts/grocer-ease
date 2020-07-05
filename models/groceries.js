const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: "www.google.com"
  },
  isCurrent: {
    type: Boolean,
    required: true,
    default: true
  },
  frequency: Number,
  brand: String,
  quantity: String,
  note: String,
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user'
  }
});

const Grocery = mongoose.model('grocery', GrocerySchema);

module.exports = Grocery;