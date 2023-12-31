const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;
const cartSchema = mongoose.Schema({
    "ProductID": { type: Types.ObjectId, ref: 'Product' },
    "quantity": Number,
    "userID": { type: Types.ObjectId, ref: 'User' },
    "Date": Date,
    "OrderPlacedStatus": { type: Boolean, default: false }

})
const CartModel = mongoose.model("Cart", cartSchema);

module.exports = { CartModel };