const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All fields!"
            })
        }

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "User already exists!"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).send({
            success: true,
            message: "User Register Successfully!"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Registration Failed!",
            error
        });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fiels are required!",
            });
        };

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid Email or Password!"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password!",
            });
        }

        // generateToken(res, user, `Welcome back ${user.name}`);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        res.status(200).send({
            success: true,
            message: "Login Successfully!",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login!",
            error
        });
    }
}