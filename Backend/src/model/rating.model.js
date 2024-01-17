//Author: Dhruvin Dankhara

// Require Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");
const Event = require("./Event.model");

//Event Schema
var RatingSchema = new Schema(
  {
    rating: Number,
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

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = { Rating };
