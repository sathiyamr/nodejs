const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sathiyamoorthy22_db_user:lxqjjJ59sVKYdK8W@cluster0.uxlapbd.mongodb.net/devTinder?appName=Cluster0"
  );
};

module.exports = connectDB;

// connectDB()
//   .then(() => {
//     console.log("DB connection established");
//   })
//   .catch(() => {
//     console.log("DB cannot be connected!!!!");
//   });
