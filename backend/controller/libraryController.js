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

// GET All Books
router.get("/books", async (req, res) => {
  try {
    if (!books) {
      return res.status(500).json({ message: "Database not initialized" });
    }

    const booksList = await books.find().toArray(); // Fetch all books
    res.json(booksList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});




module.exports = router;
