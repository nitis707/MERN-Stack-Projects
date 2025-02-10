const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
dotenv.config({});
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log("Error occured", error);
  }
};

connectDB();

// api
app.get("/", async (req, res) => {
  const db = mongoose.connection.db; // Get the native MongoDB client
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// save a pass
app.post("/", async (req, res) => {
  const password = req.body;
  const db = mongoose.connection.db; // Get the native MongoDB client
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  console.log(findResult);
  res.send({ success: true, result: findResult });
});

// delete a pass by id
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const db = mongoose.connection.db; // Get the native MongoDB client
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  res.send({ success: true, result: findResult });
});

app.listen(PORT, () => {
  console.log(`Server is listening at port http://localhost:${PORT}`);
});
