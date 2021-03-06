const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");

const app = express();

// Connect db
connectDB();

// Middlewares
app.use(express.json({extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Its running");
});

app.use("/api/users", require("./routes/api/users.js"));
app.use("/api/auth", require("./routes/api/auth.js"));
app.use("/api/profile", require("./routes/api/profile.js"));
app.use("/api/posts", require("./routes/api/posts.js"));

app.listen(PORT, () => console.log("Server is running...."))