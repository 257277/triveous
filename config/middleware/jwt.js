const jwt = require('jsonwebtoken');
require("dotenv").config();

const { UserModel } = require("../model/userModel")

const authen = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        let decoded = jwt.verify(token, process.env.privatekey);

        let userid = decoded.userId;

        const u = await UserModel.find({ "_id": userid });

        if (u.length == 0) {
            res.send("You are not authotrized");
        }


        req.body["userID"] = u[0]._id;
        next();
    }
    catch (err) {
        res.send(err);
    }
}
module.exports = {
    authen
}