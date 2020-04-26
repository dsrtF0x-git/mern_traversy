const express = require("express");
const router = express.Router();

// @route api/posts
router.get("/", (req, res) => {
  res.send("posts route");
});

module.exports = router;