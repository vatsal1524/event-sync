//Author: Dhruvin Dankhara

// Require Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");

//Event Schema
var EventSchema = new Schema(
    {
        name: {
            type: String,
        },
        dateAndTime: {
            type: Date,
        },
        location: {
            type: String,
        },
        category: {
            type: String,
        },
        tags: [{
            type: String,
            require: false
        }],
        category: String,
        ticketPrice: {
            type: Number,
        },
        description: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        users: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                dateJoined: {
                    type: Date,
                },
            },
        ],
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = { Event };
