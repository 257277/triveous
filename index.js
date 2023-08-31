const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db")
const app = express();

app.use(express.json())



app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("successfully connected to database")
    }
    catch (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.port}`);
})
