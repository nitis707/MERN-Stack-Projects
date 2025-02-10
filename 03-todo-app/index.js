const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("./db/db");
const cors = require("cors");
const user = require("./routes/userRoute")

// env config
dotenv.config();

// rest object
const app = express();

// db connect
connectDB();


// middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// routes
app.use("/api/v1/user", user);




// listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is listening at PORT ${port}!`);
});