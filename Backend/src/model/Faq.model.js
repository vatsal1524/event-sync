//author: Vatsal

// Require Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");

var FaqSchema = new Schema({
  question: String,
  answer: String,
});

const Faq = mongoose.model("Faq", FaqSchema);

module.exports = { Faq };
