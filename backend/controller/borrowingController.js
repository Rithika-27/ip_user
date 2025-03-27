const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

let db, Users;

(async () => {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB (borrowing)");
        db = client.db("library-data");
        Users = db.collection("users");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
})();

// Get borrowing details for a specific book
const getBorrowing = async (req, res) => {
    try {
        const { title } = req.query;
        const { member_id } = req.user;

        if (!title) {
            return res.status(400).json({ message: "Missing book title" });
        }

        const user = await Users.findOne({ member_id: member_id.trim() });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const book = user.borrowing_activity.find((b) => b.title === title);

        if (!book) {
            return res.status(404).json({ message: "Book not found in borrowing activity" });
        }

        res.status(200).json({ noOfRenewals: book.noOfRenewals, borrowedDate: book.borrowedDate });
    } catch (error) {
        console.error("❌ Error fetching borrowing details:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update book renewal
const updateRenewal = async (req, res) => {
    try {
        const { title } = req.body;
        const { member_id } = req.user;

        if (!title) {
            return res.status(400).json({ message: "Missing book title" });
        }

        const user = await Users.findOne({ member_id: member_id.trim() });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookIndex = user.borrowing_activity.findIndex((b) => b.title === title);

        if (bookIndex === -1) {
            return res.status(404).json({ message: "Book not found in borrowing activity" });
        }

        const book = user.borrowing_activity[bookIndex];

        if (book.noOfRenewals >= 3) {
            return res.status(400).json({ message: "Renewal limit reached (3 times max)" });
        }

        user.borrowing_activity[bookIndex].noOfRenewals += 1;
        let newBorrowedDate = new Date(book.borrowedDate);
        newBorrowedDate.setDate(newBorrowedDate.getDate() + 14);
        user.borrowing_activity[bookIndex].borrowedDate = newBorrowedDate;

        await Users.updateOne(
            { member_id: member_id.trim() },
            { $set: { borrowing_activity: user.borrowing_activity } }
        );

        res.status(200).json({ message: "Book renewed successfully", newBorrowedDate });
    } catch (error) {
        console.error("❌ Error updating renewal:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getBorrowing, updateRenewal };