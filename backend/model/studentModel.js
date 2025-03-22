const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  member_id: String,
  name: String,
  gender: String,
  batch: String,
  date_of_birth: String, // Stored as YYYY-MM-DD
  date_of_join: String,
  programme: String,
  department: String,
  address: String,
  pincode: String,
  state: String,
  email: String,
  mobile_1: String,
  mobile_2: String,
});

module.exports = mongoose.model("Student", StudentSchema);
