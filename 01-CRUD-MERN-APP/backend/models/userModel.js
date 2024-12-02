const mongoose = require("mongoose");

// create schema - structure
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number
    },
}, { timestamps: true });

// creat model - way to interaction with database
const User = mongoose.model("User", userSchema);

module.exports = User;