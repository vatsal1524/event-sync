//Author: Dhruvin Dankhara

// Require Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");
const Event = require("./Event.model");

//Event Schema
var commentSchema = new Schema(
  {
    text: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      require: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
