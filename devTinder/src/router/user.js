const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

// both the ways we can populate the fields
// const SAFE_FIELDS = "firstName lastName photoUrl gender aboutUs skills";
const SAFE_FIELDS = [
  "firstName",
  "lastName",
  "photoUrl",
  "gender",
  "aboutUs",
  "skills",
];

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const userInfo = req.user;
    const requestedConnections = await ConnectionRequest.find({
      toUserId: userInfo._id,
      status: "interested",
    }).populate("fromUserId", SAFE_FIELDS);

    res.send({
      status: "List of connections Recieved",
      data: requestedConnections,
    });
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const userInfo = req.user;
    const requestedConnections = await ConnectionRequest.find({
      $or: [
        { fromUserId: userInfo._id, status: "accepted" },
        { toUserId: userInfo._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", SAFE_FIELDS)
      .populate("toUserId", SAFE_FIELDS);

    res.send({
      status: "List of connections Accepted",
      data: requestedConnections,
    });
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

module.exports = userRouter;
