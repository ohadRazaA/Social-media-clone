const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require("./routes/route");
require('dotenv').config();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(routes);

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
})

database.once("connected", () => {
    console.log("Database Connected");
});

app.listen(port, () => { console.log("Server is started") });