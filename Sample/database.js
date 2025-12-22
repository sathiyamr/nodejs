const { MongoClient, ObjectId } = require("mongodb");

const URI =
  "mongodb+srv://sathiyamoorthy22_db_user:lxqjjJ59sVKYdK8W@cluster0.uxlapbd.mongodb.net/?appName=Cluster0";

const client = new MongoClient(URI);

async function connectMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("HelloWorld"); // Database
    const users = db.collection("users"); // Collection

    const allUsers = await users.find({}).toArray();

    console.log(allUsers);

    // const result = await users.insertOne({
    //   firstname: "Sanjay",
    //   lastname: "K",
    //   city: "Pondy",
    //   phonenumber: "992"
    // });

    // console.log("Inserted ID:", result.insertedId);

    const userId = "6946ce8234bb43eec806d3a9";

    const result = await users.updateOne(
      { _id: new ObjectId(userId) }, // filter by _id
      { $set: { firstname: "Prsanth" } }
    );

    console.log("Matched:", result.matchedCount);
    console.log("Updated:", result.modifiedCount);

    const result2 = await users.deleteOne({
      _id: new ObjectId(userId),
    });
  } catch (err) {
    console.error("MongoDB Error:", err);
  } finally {
    await client.close();
  }
}

connectMongo();
