const express = require("express");
require("dotenv").config();
const { UserModel } = require("../model/userModel");
const { hashing } = require("../middleware/hash");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRoute = express.Router();

userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.find({ "email": email });
        console.log(user);
        if (user.length == 0) {
            res.send("Please register first!");
        }
        else {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send("Someting went wrong");
                }
                else {
                    if (result == true) {
                        const payload = { userId: user[0]._id, email: user[0].email };
                        const token = jwt.sign(payload, process.env.privatekey);
                        res.send({ "msg": "Login Successfull", "token": token });
                    }
                    else {
                        res.send("Wrong Credentials");
                    }
                }
            });
        }
    }
    catch (err) {
        res.send(err);
    }
})



userRoute.use(hashing)
userRoute.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = await UserModel.find({ "email": email });
        console.log(data);
        if (data.length != 0) {
            res.send("User is already registered");
        }
        else {
            await UserModel.insertMany(req.body);
            res.send("Registration is completed")
        }
    }
    catch (err) {
        res.send(err);
    }
})


module.exports = { userRoute };