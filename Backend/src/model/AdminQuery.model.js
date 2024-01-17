//author: Vatsal

// Require Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");

const AdminQuerySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    description: String,
    status: { type: String, default: "open" },
    response: { type: String, default: "" },
  },
  { timestamps: true }
);

const AdminQuery = mongoose.model("AdminQuery", AdminQuerySchema);

module.exports = { AdminQuery };
