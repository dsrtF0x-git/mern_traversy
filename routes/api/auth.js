const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth.js");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// @route api/auth
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error.")
  }
});

router.post("/", [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists()
] , async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{msg: "Invalid credentials."}]});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{msg: "Invalid credentials."}]});
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get("jwtSecret"),
      { expiresIn: 1000 * 360 },
      (error, token) => {
        if (error) throw new Error("error");
        res.json({ token });
      }
    )
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;