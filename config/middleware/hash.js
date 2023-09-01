const bcrypt = require('bcrypt');
require("dotenv").config();


const hashing = (req, res, next) => {
    bcrypt.hash(req.body.password, 5, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
        else {
            req.body.password = hash;

            next();
        }
    });
}

module.exports = { hashing };