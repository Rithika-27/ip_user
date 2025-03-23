const mongoose = require("mongoose");

// Define the schema
const studentSchema = new mongoose.Schema({
    MEMBER_ID: { type: String, required: true, unique: true, index: true },
    NAME: { type: String, required: true },
    GENDER: { type: String, required: true, enum: ["MALE", "FEMALE", "OTHER"] },
    BATCH: { type: Number, required: true },
    DATE_OF_BIRTH: { type: String, required: true }, // Stored as string since DB stores it that way
    DATE_OF_JOIN: { type: String, required: true },
    PROGRAMME: { type: String, required: true },
    DEPARTMENT: { type: String, required: true },
    ADDRESS: { type: String, default: "" },
    PINCODE: { type: String, default: "" },
    STATE: { type: String, default: "" },
    EMAIL: { type: String, default: "N/A" },
    MOBILE_1: { type: String, default: "N/A" },
    MOBILE_2: { type: String, default: "N/A" },
    CATEGORY: { type: String, required: true, default: "STUDENT" }
}, { collection: "STUDENT", timestamps: true }); // ✅ Ensures it uses the `STUDENT` collection

// Create the model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
