const mongoose = require("mongoose");
const  { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      text:true
    },
    description: {
        type: String,
      },
      price: {
        type: Number,
      },
      sold:{
      type:Number,
      default:0
      },
      quantity: {
        type: Number,
      
      },
      images: {
        type: Array,
      },
      category:{
        type:ObjectId,
        ref:"category"
      },
  },

  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);