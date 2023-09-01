const express = require("express");

const { CartModel } = require("../model/cartModel");
const { authen } = require("../middleware/jwt")
const cartRoute = express.Router();

cartRoute.use(authen);
//add item to cart
cartRoute.post("/additem", async (req, res) => {
    try {
        req.body.Date = new Date().toISOString().split("T")[0];
        console.log(req.body);
        let data = await CartModel.find(req.body);
        if (data.length == 0) {
            await CartModel.insertMany(req.body);
            res.status(201).send("Item is added in cart");
        } else {
            res.status(400).send("Item already present in the cart");
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})
//getting cart item
cartRoute.get("/cartItem", async (req, res) => {
    try {
        let data = await CartModel.find({ "OrderPlacedStatus": false });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})
// updating cart item quantity
cartRoute.patch("/updateQuantity/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let updatedQuantity = req.body.quantity;
        await CartModel.findByIdAndUpdate({ "_id": id }, { "quantity": updatedQuantity })
        res.status(200).send("Quantity updated successfully");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

//deleting cart item
cartRoute.delete("/deleteItem/:id", async (req, res) => {
    try {
        let id = req.params.id;
        await CartModel.findByIdAndDelete(id)
        res.status(200).send("Item deleted");
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})


module.exports = { cartRoute }