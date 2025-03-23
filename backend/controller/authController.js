const express = require("express");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

let db, Student, Users;

(async () => {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
        db = client.db("library-data");
        Student = db.collection("STUDENT");
        Users = db.collection("users");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
})();

exports.login = async (req, res) => {
    try {
        const { member_id, date_of_birth } = req.body;
        console.log("Login Attempt:", { member_id, date_of_birth });

        if (!member_id || !date_of_birth) {
            return res.status(400).json({ message: "Missing credentials" });
        }

        // Ensure consistent string formatting
        const user = await Student.findOne({
            MEMBER_ID: member_id.trim(),
        });

        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "Wrong credentials" });
        }

        const storedDOB = new Date(user.DATE_OF_BIRTH).toISOString().split("T")[0]; // Format to YYYY-MM-DD
        if (storedDOB !== date_of_birth.trim()) {
            console.log("Incorrect date of birth");
            return res.status(401).json({ message: "Wrong credentials" });
        }

        
        const token = jwt.sign(
            { id: user._id, member_id: user.MEMBER_ID },
            process.env.JWT_SECRET || "yourSecretKey",
            { expiresIn: "1h" }
        );

        
        const existingUser = await Users.findOne({ member_id: user.MEMBER_ID });

        if (!existingUser) {
            // Insert new user into "users" collection
            await Users.insertOne({
                member_id: user.MEMBER_ID,
                name: user.NAME,
                email: user.EMAIL || null,
                mobile: user.MOBILE_1 || null,
                department: user.DEPARTMENT,
                borrowing_activity: [], 
                wishlist: [] 
            });
            console.log("New user added to 'users' collection.");
        } else {
            console.log("User already exists in 'users' collection.");
        }

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                member_id: user.MEMBER_ID,
                name: user.NAME,
                batch: user.BATCH,
                programme: user.PROGRAMME,
            },
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
