import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

const updateBorrowingActivity = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("library-data");
    const usersCollection = db.collection("users");

    const borrowingActivity = [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        borrowedDate: "2025-03-10",
        noOfRenewals: 0,
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
        borrowedDate: "2025-03-20",
        noOfRenewals: 0,
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma et al.",
        borrowedDate: "2025-03-18",
        noOfRenewals: 0,
      },
      {
        title: "Refactoring",
        author: "Martin Fowler",
        borrowedDate: "2025-03-16",
        noOfRenewals: 0,
      },
      {
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        borrowedDate: "2025-03-14",
        noOfRenewals: 0,
      },
    ];

    const result = await usersCollection.updateOne(
      { member_id: "22z352" },
      { $set: { borrowing_activity: borrowingActivity } }
    );

    console.log("✅ Borrowing activity updated:", result.modifiedCount);
  } catch (error) {
    console.error("❌ Error updating borrowing activity:", error);
  } finally {
    await client.close();
  }
};

// Run the function
updateBorrowingActivity();
