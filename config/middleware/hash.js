const bcrypt = require('bcrypt');
require("dotenv").config();


const hashing = (req, res, next) => {
    bcrypt.hash(req.body.password, 5, function (err, hash) {
        if (err) {
            console.log(err);
            res.send("somthing went wrong");
        }
        else {
            req.body.password = hash;
            console.log(req.body);
            next();
        }
    });
}

module.exports = { hashing };