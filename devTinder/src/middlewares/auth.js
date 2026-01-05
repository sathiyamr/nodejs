const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(404).send("Token doesn't exists!");
    }
    const decodedToken = jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedToken;
    const user = await User.findOne({ _id: _id });
    if (!user) {
      res.status(404).send("user not found");
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { userAuth };
