const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
require('dotenv').config()
const connectDB = require("./config/db");
const app = express()
app.use(morgan("dev"));
app.use(cors());
connectDB();
app.use(bodyParser.json({ limit: "20mb" }));

 readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

const port = process.env.PORT

app.listen(port,()=>{
    console.log('server is running on port 5000')
})
