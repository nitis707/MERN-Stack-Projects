const jwt = require("jsonwebtoken");

module.exports.generateToken = (res, user, message) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }).json({
            success: true,
            message,
            user
        });

};