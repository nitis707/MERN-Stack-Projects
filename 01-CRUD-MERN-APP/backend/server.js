const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute.js");
const cors = require("cors");

dotenv.config();

app.use(cors());

// Middleware to parse JSON requests
// Middleware to parse URL-encoded data (optional, for forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function main() {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to DB");

    // Start the server only after a successful DB connection
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Server is listening to port ${process.env.PORT}`);
    });
}

main().catch((err) => {
    console.log("DB connection failed", err);
});


app.use("/", userRouter);
