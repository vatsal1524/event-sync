// author: Mehul Bhunsadiya
const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Schema
var UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    activeStatus: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      required: true,
    },
    interests: [
      {
        type: String,
      },
    ],
    reset_password_token: {
      type: Number,
      default: null,
    },
    peopleDefault: {
      type: Number,
      default: -1,
    },
    ageDefault: {
      type: Number,
      default: -1,
    },
    fcmTokens: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
