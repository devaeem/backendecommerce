const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    enabled: {
      type: Boolean,
      default: "false",
    },
    address:String,
    wishlist:[{
      type: ObjectId,
      ref: 'products'
    }]
    
  },

  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);