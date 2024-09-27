const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MongoUrl = "mongodb+srv://mpinaudlatapie:Rqd3ujQwzKxctUYZ@smartcity.xljgv.mongodb.net/"

const connectDB = async () => {
  try {
    await mongoose.connect(MongoUrl)

  console.log('MongoDB Connected...')
  }
  catch (err) {
    console.log(err.message);
  };
};


module.exports = connectDB