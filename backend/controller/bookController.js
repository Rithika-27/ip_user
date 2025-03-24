const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

let db, Users;

(async () => {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB (book)");
        db = client.db("library-data");
        Users = db.collection("users");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
})();

// Controller function to get books for a specific user
const getMyBooks = async (req, res) => {
    try {
        const { member_id } = req.user;

        if (!member_id) {
            return res.status(400).json({ error: "Missing member_id parameter" });
        }

        const user = await Users.findOne({ member_id: member_id.trim() });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ borrowing_activity: user.borrowing_activity || [] });
    } catch (err) {
        console.error("❌ Error fetching books:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Export the controller function
module.exports = { getMyBooks };
