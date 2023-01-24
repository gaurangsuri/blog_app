const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./src/auth/router");
const blogRouter = require("./src/blog/router");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//DB connect
mongoose.connect("mongodb+srv://gaurangsuri:eZDbTUOFIyihzYQX@cluster0.dtsbtnh.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.on("connected",()=>{
    console.log("DB Connected");
})

app.use("/auth",authRouter);
app.use("/blog",blogRouter);

app.listen(4000,()=>{
    console.log("server started on port 4000");
});