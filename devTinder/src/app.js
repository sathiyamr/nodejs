const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
// const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON payload",
    });
  }

  // 👉 You call next(err) so that errors you are NOT handling here can be handled elsewhere
  // 👉 If you don’t call it, those errors are silently swallowed

  next(err);
});

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const userInfo = req.user;
    res.send(userInfo);
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const userInfo = req.user;
    res.send("Send Connect request " + userInfo.firstName);
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB connection established");
    app.listen(3000, () => {
      console.log("My app server is listening port number 3000.....");
    });
  })
  .catch(() => {
    console.log("DB cannot be connected!!!!");
  });
