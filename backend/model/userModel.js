const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  member_id: { type: String, unique: true },
  password: String, // Hashed DOB
  student_details: Object,
  borrowing_activity: { type: Array, default: [] },
  wishlist: { type: Array, default: [] },
});

module.exports = mongoose.model("User", UserSchema);
