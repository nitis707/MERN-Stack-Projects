const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");

// create user
router.post("/", async (req, res) => {
    const { username, email, age } = req.body;

    try {
        const userData = await User.create({
            username: username,
            email: email,
            age: age,
        });
        return res.status(201).json(userData);
    } catch (error) {

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const missingFields = Object.values(error.errors).map((err) => err.path);
            const errorMessage = `${missingFields.join(" & ")} is required`;
            return res.status(400).json({ error: errorMessage });
        }

        // Handle duplicate email error
        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({ error: "Email already exists. Please use a different email." });
        }
        console.log(error);
        return res.status(500).json({ error: "An error occurred. Please try again." });
    }
});


// get all users
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        if (showAll.length === 0) {
            return res.status(404).json({ message: "Users not found" });
        }
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.send(500).json({ error: error.message })
    }
});

// get sigle user
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        if (!singleUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.send(500).json({ error: error.message })
    }
});

// update
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.send(500).json({ error: error.message })
    }
});

// delete user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(deleteUser);
    } catch (error) {
        console.log(error);
        res.send(500).json({ error: error.message })
    }
});


module.exports = router;

/*

***req.params:***
Usage: Used to extract parameters from the URL path.
When to use: When the data is part of the URL itself, often defined in the route.


***req.body:***
Usage: Used to extract data from the request body.
When to use: When the data is sent in the body of the request, such as for POST, PUT, or PATCH methods.
From input

*/