const express = require("express");
const { getBorrowing, updateRenewal } = require("../controller/borrowingController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Get borrowing details for a specific book
router.get("/get", authenticateUser, getBorrowing);

// Update book renewal
router.post("/update", authenticateUser, updateRenewal);

module.exports = router;
