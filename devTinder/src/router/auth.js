const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const pwd = req.body.password;

    if (!pwd) {
      throw new Error("Password field cannot be empty");
    }

    const encryptedPwd = await bcrypt.hash(pwd, 10);
    const userModel = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      password: encryptedPwd,
    });

    await userModel.save();

    res.send("User Added Successfully !!!!!");
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const pwd = req.body.password;
    const userInfo = await User.findOne({ emailId: emailId });
    if (!userInfo) {
      throw new Error("Invalid Credentials");
    }
    const isValid = await userInfo.validatePassword(pwd);
    if (!isValid) {
      throw new Error("Invalid Credentials");
    }
    const jwtToken = await userInfo.getJWT();
    res.cookie("token", jwtToken);
    res.send("Logged In Successfully!!!!");
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = authRouter;
