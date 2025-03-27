const mongoose = require("mongoose");

const BorrowingActivitySchema = new mongoose.Schema({
  title: String,
  author: String,
  borrowedDate: Date,
  noOfRenewals: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
  member_id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  mobile: String,
  department: String,
  year: String,
  wishlist: [String],
  borrowing_activity: [BorrowingActivitySchema],
});

module.exports = mongoose.model("User", UserSchema);
