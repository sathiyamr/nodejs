const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://sathiyamoorthy22_db_user:fLTiJFSF4wdjBWDH@ac-9xb3uxg-shard-00-00.uxlapbd.mongodb.net:27017,ac-9xb3uxg-shard-00-01.uxlapbd.mongodb.net:27017,ac-9xb3uxg-shard-00-02.uxlapbd.mongodb.net:27017/devTinder?replicaSet=atlas-13hro9-shard-0&ssl=true&authSource=admin"
  );
};
// mongodb+srv://sathiyamoorthy22_db_user:fLTiJFSF4wdjBWDH@cluster0.uxlapbd.mongodb.net/devTinder?appName=Cluster0
// mongodb://sathiyamoorthy22_db_user:fLTiJFSF4wdjBWDH@ac-9xb3uxg-shard-00-00.uxlapbd.mongodb.net:27017,ac-9xb3uxg-shard-00-01.uxlapbd.mongodb.net:27017,ac-9xb3uxg-shard-00-02.uxlapbd.mongodb.net:27017/devTinder?replicaSet=atlas-13hro9-shard-0&ssl=true&authSource=admin
module.exports = connectDB;

// connectDB()
//   .then(() => {
//     console.log("DB connection established");
//   })
//   .catch(() => {
//     console.log("DB cannot be connected!!!!");
//   });
