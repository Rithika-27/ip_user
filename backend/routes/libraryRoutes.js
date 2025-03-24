const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

let db, books;

(async () => {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
        db = client.db("library-data");
        books = db.collection("books");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
})();

// GET Books by Category
router.get("/books", async (req, res) => {
  try {
      if (!books) {
          return res.status(500).json({ message: "Database not initialized" });
      }

      const categoryName = req.query.category; // Ensure this matches frontend
      if (!categoryName) {
          return res.status(400).json({ message: "Category name is required" });
      }

      console.log("Received category from frontend:", categoryName);

      // Case-insensitive category match
      const booksList = await books.find({ category: new RegExp(`^${categoryName}$`, "i") }).toArray();

      if (booksList.length === 0) {
          return res.status(404).json({ message: "No books available in this category." });
      }

      res.json(booksList);
  } catch (error) {
      console.error("❌ Error fetching books:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
