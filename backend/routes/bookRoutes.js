const express = require("express");
const router = express.Router();
const { getMyBooks }= require("../controller/bookController");

// Route to get books
router.get("/mybooks", getMyBooks);

module.exports = router;
