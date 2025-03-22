const Student = require("../model/studentModel");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { member_id, date_of_birth } = req.body;

  try {
    const student = await Student.findOne({ member_id });

    if (!student || student.date_of_birth !== date_of_birth) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let user = await User.findOne({ member_id });

    if (!user) {
      const hashedPassword = await bcrypt.hash(date_of_birth, 10);

      user = new User({
        member_id,
        password: hashedPassword,
        student_details: student.toObject(),
      });

      await user.save();
    }

    const token = jwt.sign({ member_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { login };
