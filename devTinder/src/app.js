const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
// const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());

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
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const pwd  = req.body.password;
    const userInfo = await User.findOne({ emailId: emailId });
    if (!userInfo) {
      throw new Error("Invalid Credentials");
    }
    const isValid = await bcrypt.compare(pwd, userInfo.password);
    if (!isValid) {
      throw new Error("Invalid Credentials");

    }
    res.send(userInfo);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userInfo = await User.find({ emailId: req.body.emailId });
    if (userInfo.length === 0) {
      res.status(404).send("user not found");
      return;
    }
    res.send(userInfo);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/user/one", async (req, res) => {
  try {
    const userInfo = await User.findOne({ emailId: req.body.emailId });
    if (!userInfo) {
      res.status(404).send("user not found");
      return;
    }
    res.send(userInfo);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/user/id", async (req, res) => {
  console.log("RRRR", req.body.id);
  try {
    const userInfo = await User.findById(req.body.id);
    if (!userInfo) {
      res.status(404).send("user id not found");
      return;
    }
    res.send(userInfo);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete("/user/id", async (req, res) => {
  try {
    const userInfo = await User.findByIdAndDelete(req.body.id);
    if (!userInfo) {
      res.status(404).send("user id not found");
      return;
    }
    res.send("User deleted successfully!!!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const allowedFields = ["age", "gender", "photoUrl", "aboutUs", "skills"];

  try {
    const isValid = Object.keys(data).every((field) =>
      allowedFields.includes(field)
    );
    if (!isValid) {
      // res.status(404).send("One or more fields are not allowed to be updated.");
      // return;
      throw new Error("One or more fields are not allowed to be updated.");
    }
    const userInfo = await User.findByIdAndUpdate(userId, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!userInfo) {
      res.status(404).send("user id not found");
      return;
    }
    res.send("User Updated successfully!!!" + userInfo);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const userInfo = await User.find({});
    if (userInfo.length === 0) {
      res.status(404).send("user not found");
      return;
    }
    res.send(userInfo);
  } catch (err) {
    res.status(400).send(err.message);
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
