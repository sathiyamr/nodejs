const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter, profileRouter, requestRouter, userRouter);

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
