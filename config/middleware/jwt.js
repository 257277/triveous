const jwt = require('jsonwebtoken');
require("dotenv").config();

const { UserModel } = require("../model/userModel")

const authen = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        let decoded = jwt.verify(token, process.env.privatekey);

        let userid = decoded.userId;

        const u = await UserModel.find({ "_id": userid });

        if (u.length == 0) {
            return res.status(401).json({ message: "You are not authorized" });
        }


        req.body["userID"] = u[0]._id;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });

    }
}
module.exports = {
    authen
}