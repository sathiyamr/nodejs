const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  // Users should see all the users card except followings stuffs
  // Own account
  // If I was already requessted, I requested user
  // eg: acceepted, rejected, interested, ignored

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const skipValue = (page - 1) * limit;

  const userInfo = req.user;
  const existingConnections = await ConnectionRequest.find({
    $or: [{ fromUserId: userInfo._id }, { toUserId: userInfo._id }],
  }).select("fromUserId toUserId");

  const connectedUserIds = existingConnections.map((conn) =>
    conn.fromUserId.equals(userInfo._id) ? conn.toUserId : conn.fromUserId,
  );

  // const excludedUserIds = [userInfo._id, ...connectedUserIds];
  // const users = await User.find({
  //   _id: { $nin: excludedUserIds },
  // });

  console.log(skipValue, limit);

  //   const users = await User.find({
  //     $and: [
  //       {
  //         _id: { $nin: [...connectedUserIds] },
  //       },
  //       {
  //         _id: { $ne: userInfo._id },
  //       },
  //     ],
  //   })
  //     .select(SAFE_FIELDS.join(" "))
  //     .skip(skipValue)
  //     .limit(limit);

  //     const filter = {
  //   _id: {
  //     $nin: [...connectedUserIds, userInfo._id],
  //   },
  // };

  // const usersCount = await User.countDocuments({
  //   _id: {
  //     $nin: [...connectedUserIds, userInfo._id],
  //   },
  // });

  // I just got the below code in chatGPT which is more efficient

  const filter = {
    $and: [
      {
        _id: { $nin: [...connectedUserIds] },
      },
      {
        _id: { $ne: userInfo._id },
      },
    ],
  };

  const [users, usersCount] = await Promise.all([
    User.find(filter)
      .select(SAFE_FIELDS.join(" "))
      .skip(skipValue)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  let totalPages = usersCount <= limit ? 1 : Math.ceil(usersCount / limit);

  res.send({
    pagination: {
      page: page,
      limit: limit,
      totalPages: totalPages,
    },
    data: users,
  });

  try {
  } catch (err) {
    res.status(400).send("ERRROR:::" + err.message);
  }
});

module.exports = userRouter;
