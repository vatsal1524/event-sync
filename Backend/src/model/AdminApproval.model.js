// author: Preetha Kachhadiya

// Require Mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { User } = require('./User.model')

//Event Schema
var AdminApprovalSchema = new Schema(
  {
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User' // 'Event' is the name of the related model (collection)
    },
    user_email: {
      type: Schema.Types.String, // Declaring the field as a Mongoose ObjectId
      ref: 'User' // 'User' is the name of the related model (collection)
    },
    certificate: { type: String },
    approval_status: { type: String, default: "pending" }
  },
  { timestamps: true }
)

const AdminApproval = mongoose.model('AdminApproval', AdminApprovalSchema)

module.exports = { AdminApproval }
