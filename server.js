const express = require("express");
const connectDB = require("./config/db.js");

const app = express();

// Connect db
connectDB();

const PORT = process.env.PORT || 4444;

app.get("/", (req, res) => {
  res.send("Its running")
})

app.listen(PORT, () => console.log("Server is running...."))