const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const profileRoutes= require("./routes/profileRoutes");
const wishlistRoutes=require("./routes/wishlistRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const verifyToken = require("./middleware/authMiddleware");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", verifyToken,bookRoutes);  
app.use("/api/profile", verifyToken,profileRoutes);  
app.use("/api/wishlist", verifyToken,wishlistRoutes); 
app.use("/api/library", libraryRoutes); 
app.use("/api/suggestbook",suggestionRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
