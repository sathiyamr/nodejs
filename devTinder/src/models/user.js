const mongoose = require("mongoose");

// Schema sample from the documentation

// const userSchema = new Schema({
//   title: String, // String is shorthand for {type: String}
//   author: String,
//   body: String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs: Number
//   }
// });

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    emailId: String,
    password: String,
    age: Number,
    gender: String,
  },
  { collection: "User" }
);

// const userModel = mongoose.model('User', userSchema);

module.exports = mongoose.model("User", userSchema);
