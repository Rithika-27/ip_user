const express = require("express");
const { getMyBooks } = require("../controller/bookController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route: Requires authentication
router.get("/myBooks", verifyToken, getMyBooks);

module.exports = router;
