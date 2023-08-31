const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;
const productSchema = mongoose.Schema({
    "title": String,
    "price": Number,
    "description": String,
    "availability": Boolean,
    "categoryID": { type: Types.ObjectId, ref: 'Category' }

})
const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };