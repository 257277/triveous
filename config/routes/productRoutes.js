const express = require("express");

const { ProductModel } = require("../model/productModel");
const { CategoryModel } = require("../model/categoryModel");
const productRoute = express.Router();

productRoute.post("/listing", async (req, res) => {
    try {
        let { title, price, description, availability, categoryID } = req.body;
        let product = await ProductModel.find(req.body);
        if (product.length) {
            res.send("Product is already added!");
        }
        else {
            await ProductModel.insertMany(req.body);
            res.send("Product added successfully");
        }
    }
    catch (err) {
        console.log(err);
    }
})

productRoute.get("/details/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let data = await ProductModel.find({ "_id": id });
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
})





module.exports = { productRoute };