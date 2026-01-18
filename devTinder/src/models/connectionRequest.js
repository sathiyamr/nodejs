const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
    },
  },
  { collection: "ConnectionRequest", timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

// connectionRequestSchema.pre("save", () => {
//   const connectionRq = this;

//   console.log('connectionRq.fromUserId', connectionRq.fromUserId, connectionRq.toUserId, this.new);
//   if (connectionRq.fromUserId === connectionRq.toUserId) {
//     throw new Error("Request cannot be sent to himself!!");
//   }
// });

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
