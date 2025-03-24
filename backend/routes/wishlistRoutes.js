const express = require("express");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controller/wishlistController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify JWT

const router = express.Router();

router.post("/add", authMiddleware, addToWishlist);
router.get("/get", authMiddleware, getWishlist);
router.post("/remove", authMiddleware, removeFromWishlist);

module.exports = router;
