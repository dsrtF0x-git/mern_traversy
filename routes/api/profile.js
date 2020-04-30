const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const Profile = require("../../models/Profile.js");
const User = require("../../models/User.js");

// @route api/profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", [
      "name", "avatar"
    ]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user."})
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

module.exports = router;