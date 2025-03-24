const express = require("express");
const { getDetails } = require("../controller/profileController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route: Requires authentication
router.get("/getDetails", verifyToken, getDetails);

module.exports = router;
