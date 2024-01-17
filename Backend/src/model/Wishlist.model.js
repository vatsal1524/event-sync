// author: Preetha Kachhadiya

// Require Mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { Event } = require('./Event.model')

//Event Schema
var WishlistSchema = new Schema(
  {
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event' // 'Event' is the name of the related model (collection)
      }
    ],
    userId: {
      type: Schema.Types.ObjectId // Declaring the field as a Mongoose ObjectId
      // ref: 'user' // 'User' is the name of the related model (collection)
    },
    user: { type: String }
  },
  { timestamps: true }
)

const Wishlist = mongoose.model('Wishlist', WishlistSchema)

module.exports = { Wishlist }
