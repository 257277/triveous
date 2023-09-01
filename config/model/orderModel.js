const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;
const orderSchema = mongoose.Schema({
    "cartID": [{ type: Types.ObjectId, ref: 'Cart' }],
    "userID": { type: Types.ObjectId, ref: 'User' },
    "orderPlacedDate": { type: Date, default: null }
})
const OrderModel = mongoose.model("Order", orderSchema);

module.exports = { OrderModel };