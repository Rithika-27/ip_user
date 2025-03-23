const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

let db, Users;

(async () => {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
        db = client.db("library-data");
        Users = db.collection("users");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
})();

// Controller function to get books for a specific user
const getMyBooks = async (req, res) => {
    try {
      const { member_id } = req.query;
  
      console.log("🔍 Received member_id:", member_id);
  
      if (!member_id) {
        return res.status(400).json({ error: "Missing member_id parameter" });
      }
  
      const user = await Users.findOne({ member_id: member_id.trim() });
  
      console.log("🔍 Fetched User Data:", user);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(user.borrowing_activity || []);
    } catch (err) {
      console.error("❌ Error fetching books:", err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  // Make sure to export it properly
  module.exports = { getMyBooks };
  