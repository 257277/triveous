const express = require("express");

const { ProductModel } = require("../model/productModel");
const { CategoryModel } = require("../model/categoryModel");
const productRoute = express.Router();
//adding new product
productRoute.post("/listing", async (req, res) => {
    try {
        let { title, price, description, availability, categoryID } = req.body;
        let product = await ProductModel.find(req.body);
        if (product.length) {
            res.status(400).send("Product is already added!");
        }
        else {
            await ProductModel.insertMany(req.body);
            res.status(201).send("Product added successfully");
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})
//getting detail of product with respect to given id
productRoute.get("/details/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let data = await ProductModel.find({ "_id": id });
        if (data.length) {
            res.status(200).send(data);
        } else {
            res.status(404).send("Product not found");
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
})





module.exports = { productRoute };