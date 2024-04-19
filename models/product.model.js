const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a product name"],
      minlength: [3, "make name more than 3 characters"],
      maxlength: [20, "make name less than 20 characters"],
    },

    description: {
      type: String,
      required: [true, "please enter a product description"],
      minlength: [5, "make description more than 5 characters"],
      maxlength: [100, "make description less than 20 characters"],
    },
    sellerIdentity: {
      type: mongoose.Schema.ObjectId,
      ref:'User',
      required: [true, "please select a seller"],
    },
    photo: {
      type: String,
    },

    creationDate: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
