const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

let db, Users, Books;

(async () => {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB (book)");
        db = client.db("library-data");
        Users = db.collection("users");
        Books = db.collection("books");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
})();

/**
 * Add a book to the user's wishlist
 */
const addToWishlist = async (req, res) => {
    try {
        const { bookId } = req.body;
        const { member_id } = req.user; // Extract member_id from req.user

        if (!member_id) {
            return res.status(400).json({ error: "Missing member_id parameter" });
        }

        if (!bookId) {
            return res.status(400).json({ error: "Missing bookId parameter" });
        }

        // Find user
        const user = await Users.findOne({ member_id: member_id.trim() });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Retrieve book details
        const book = await Books.findOne({ _id: new ObjectId(bookId) });
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Ensure wishlist array exists
        if (!user.wishlist) {
            user.wishlist = [];
        }

        // Check if book is already in wishlist
        if (user.wishlist.some(item => item.bookId.equals(book._id))) {
            return res.status(400).json({ error: "Book already in wishlist" });
        }

        // Add book to wishlist (store only relevant details)
        await Users.updateOne(
            { member_id: member_id.trim() },  // Use member_id instead of userId
            { $push: { wishlist: { bookId: book._id, title: book.title, author: book.author , image:book.image } } }
        );

        res.status(200).json({ message: "Book added to wishlist", book });
    } catch (err) {
        console.error("❌ Error adding to wishlist:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Get user's wishlist
 */
const getWishlist = async (req, res) => {
    try {
        const { member_id } = req.user;

        if (!member_id) {
            return res.status(400).json({ error: "Missing member_id parameter" });
        }

        // Find user
        const user = await Users.findOne({ member_id: member_id.trim() });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ wishlist: user.wishlist || [] });
    } catch (err) {
        console.error("❌ Error retrieving wishlist:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Remove a book from user's wishlist
 */
const removeFromWishlist = async (req, res) => {
    try {
        const { bookId } = req.body;
        const { member_id } = req.user;

        if (!member_id) {
            return res.status(400).json({ error: "Missing member_id parameter" });
        }

        if (!bookId) {
            return res.status(400).json({ error: "Missing bookId parameter" });
        }

        // Find user
        const user = await Users.findOne({ member_id: member_id.trim() });

        if (!user || !user.wishlist) {
            return res.status(404).json({ error: "User or wishlist not found" });
        }

        // Convert bookId to string for comparison
        const bookIdStr = bookId.toString();

        // Check if book is in wishlist
        const updatedWishlist = user.wishlist.filter(book => book.bookId.toString() !== bookIdStr);

        if (updatedWishlist.length === user.wishlist.length) {
            return res.status(404).json({ error: "Book not found in wishlist" });
        }

        // Update wishlist in database
        await Users.updateOne(
            { member_id: member_id.trim() },
            { $set: { wishlist: updatedWishlist } }
        );

        res.status(200).json({ message: "Book removed from wishlist" });
    } catch (err) {
        console.error("❌ Error removing from wishlist:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Export controllers
module.exports = { addToWishlist, getWishlist, removeFromWishlist };