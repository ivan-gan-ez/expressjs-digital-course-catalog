const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());

// instruction: setup cors

app.use(cors());

// instruction: setup MongoDB Connection

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/digitalcatalog");
    console.log("Server connected!");
  } catch (error) {
    console.log(error);
  }
}

connectToMongoDB();

// instruction: setup routes

app.use("/courses", require("./routes/courses"));
app.use("/instructors", require("./routes/instructors"));

app.get("/", (req, res) => {
  res.send("Good luck!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
