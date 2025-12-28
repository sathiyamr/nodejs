const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
// const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.post("/signup", async (req, resp) => {
  const userModel = new User({
    firstName: "Pranav",
    lastName: "S",
    emailId: "ps@sm.com",
    password: "123456",
    age: "36",
    gender: "M",
  });

  await userModel.save();

  resp.send("User Added Successfully !!!!!");
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
