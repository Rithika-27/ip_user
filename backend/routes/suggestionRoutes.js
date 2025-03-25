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

// Route to fetch 5 random books
router.get("/random", async (req, res) => {
    try {
        if (!books) {
            return res.status(500).json({ message: "Database connection not established" });
        }

        const suggestions = await books.aggregate([{ $sample: { size: 5 } }]).toArray(); // Fetch 5 random books
        if (!suggestions.length) {
            return res.status(404).json({ message: "No books found" });
        }
        res.json(suggestions);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
