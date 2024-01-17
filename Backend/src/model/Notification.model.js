//author: Faizal

const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");

//User Schema
var NotificationSchema = new Schema(
  {
    notificationType: {
      type: String, //reminder / notification
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String, //Success, Danger, Warning
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = { Notification };
