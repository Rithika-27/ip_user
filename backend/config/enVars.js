import dotenv from "dotenv";
dotenv.config(); // Load environment variables

console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI); // Debugging line

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI, // ✅ Use process.env
  PORT: process.env.PORT || 5000,
};
