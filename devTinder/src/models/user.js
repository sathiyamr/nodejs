const mongoose = require("mongoose");
const validator = require("validator");

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
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: 50,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      maxLength: 50,
      validate: {
        validator: function (v) {
          return validator.isStrongPassword(v);
        },
        message: (props) => `${props.value} is not a strong password`,
      },
    },
    age: {
      type: Number,
      min: 18,
      maxLength: 4,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message:
          "{VALUE} is not a valid gender. Allowed values are male, female, other.",
      },
      maxLength: 10,
    },
    photoUrl: {
      type: String,
      maxLength: 225,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&s",
      validate: {
        validator: function (v) {
          return validator.isURL(v);
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    aboutUs: {
      type: String,
      default: "Hai How are you ",
      maxLength: 225,
    },
    skills: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: (props) =>
          `${props.value} skill set exceeds the limit, max 10 is allowed`,
      },
    },
  },
  { collection: "User", timestamps: true }
);

// const userModel = mongoose.model('User', userSchema);

module.exports = mongoose.model("User", userSchema);
