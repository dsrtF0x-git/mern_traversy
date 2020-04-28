const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const auth = require("../../middleware/auth.js");
// @route api/auth
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error.")
  }
});

module.exports = router;