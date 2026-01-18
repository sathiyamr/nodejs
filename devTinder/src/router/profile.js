const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const userInfo = req.user;
    res.send(userInfo);
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = req.body;
    const allowedFields = ["age", "gender", "photoUrl", "aboutUs", "skills"];
    const isValid = Object.keys(data).every((field) =>
      allowedFields.includes(field)
    );
    if (isValid) {
      Object.keys(data).forEach((key) => {
        user[key] = data[key];
      });
      user.save();
      res.send(`${user.firstName} updated successfully !!!`);
    } else {
      throw new Error("One or more fields are not allowed to be updated.");
    }
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = req.body;
    const newPwd = data.password;
    const userId = user._id;

    const encryptedPwd = await bcrypt.hash(newPwd, 10);
    const userInfo = await User.findByIdAndUpdate(
      userId,
      { password: encryptedPwd },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    userInfo.save();
    res.send(`${user.firstName} updated successfully !!!`);
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

module.exports = profileRouter;
