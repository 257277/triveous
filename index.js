const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRoute } = require("./config/routes/userRoutes");
const { cateRoute } = require("./config/routes/categoryRoutes");
const app = express();

app.use(express.json())

app.use("/user", userRoute);
app.use("/category", cateRoute);

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
