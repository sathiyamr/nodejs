const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const userInfo = req.user;
    res.send("Send Connect request " + userInfo.firstName);
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const userInfo = req.user;

      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      if (status !== "interested" && status !== "ignore") {
        throw new Error("Invalid Status !!");
      }

      // below condition check, I have moved to Model.pre save middleware
      // for now commenting that -  due to some issue
      if (fromUserId.toString() === toUserId) {
        throw new Error("You cannot send a request to yourself. !!");
      }
      const userObj = await User.findById(toUserId);
      if (!userObj) {
        throw new Error("User doesn't Exists!!");
      }

      const isConnectionRequestExists = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isConnectionRequestExists) {
        throw new Error("Connection Request Already exists!!");
      }

      const connectionRequestModel = new ConnectionRequest({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });

      await connectionRequestModel.save();
      res.send("Send Connect request from " + userInfo.firstName);
    } catch (err) {
      res.status(400).send("ERRROR:::" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      console.log("USER:", req.params.status);

      const loggedInUserId = req.user._id;
      const requestId = req.params.requestId;
      const status = req.params.status;

      if (status !== "accepted" && status !== "rejected") {
        throw new Error("Invalid Status !!");
      }

      const isConnectionRequestExists = await ConnectionRequest.findOne({
        _id: requestId,
        status: "interested",
        toUserId: loggedInUserId,
      });

      if (!isConnectionRequestExists) {
        throw new Error("Connection Request Doesn't exists!!");
      }

      console.log("USER:", isConnectionRequestExists, loggedInUserId);

      isConnectionRequestExists.status = status;

      await isConnectionRequestExists.save();
      res.send("Connection request  " + status);
    } catch (err) {
      res.status(400).send("ERRROR:::" + err.message);
    }
  }
);

module.exports = requestRouter;
