const express = require("express");

const { CategoryModel } = require("../model/categoryModel");

const cateRoute = express.Router();

cateRoute.post("/listing", async (req, res) => {
    try {
        const { name } = req.body;
        let cat = await CategoryModel.find(req.body);
        if (cat.length != 0) {
            res.send("Already added");
        }
        else {
            await CategoryModel.insertMany(req.body);
            res.send("Category added successfully");
        }
    }
    catch (err) {
        console.log(err);
    }
})



module.exports = { cateRoute }