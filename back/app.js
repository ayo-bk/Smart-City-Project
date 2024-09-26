const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MongoUrl = "mongodb+srv://mpinaudlatapie:Rqd3ujQwzKxctUYZ@smartcity.xljgv.mongodb.net/"

mongoose.connect(MongoUrl).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: ", err);
});

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.listen(5001, () => {
  console.log("Node js server started.");
});