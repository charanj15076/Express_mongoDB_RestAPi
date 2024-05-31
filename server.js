
const express = require("express");

const dotenv = require("dotenv").config();

const connetDb = require("./config/dbConnection");

const errorHandler = require("./middleware/errorHandler");


connetDb();
const app = express();

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRouts"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const port =  4000;




app.listen(port, () => {
    console.log(`server running on ${port}`);
});