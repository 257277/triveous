const express = require("express");

const { OrderModel } = require("../model/orderModel")
const { authen } = require("../middleware/jwt");
const { CartModel } = require("../model/cartModel");
const orderRoute = express.Router();


orderRoute.use(authen);

orderRoute.post("/placeorder", async (req, res) => {
    try {
        let cartid = await CartModel.find({ userID: req.body.userID, OrderPlacedStatus: false });
        let cartIDs = cartid.map(cart => cart._id);
        let order = new OrderModel({
            cartID: cartIDs,
            userID: req.body.userID,
            orderPlacedDate: new Date().toISOString().split("T")[0]
        });
        let data = await order.save();
        console.log(data);
        res.status(201).json({ "msg": "Order placed is successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


orderRoute.get("/orderhistory", async (req, res) => {
    try {
        let data = await OrderModel.find({ userID: req.body.userID });
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

orderRoute.get("/orderdetail/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let data = await OrderModel.find({ "_id": id });
        if (data.length) {
            res.status(200).json(data);
        } else {
            res.status(404).send("Order not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { orderRoute }