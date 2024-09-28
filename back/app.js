const mongoose = require("mongoose");

const MongoUrl = "mongodb+srv://mpinaudlatapie:Rqd3ujQwzKxctUYZ@smartcity.xljgv.mongodb.net/Project?retryWrites=true&w=majority&appName=SmartCity"


const connectDB = async () => {
  try {
    await mongoose.connect(MongoUrl)
    console.log('MongoDB Successfully Connected...')
  }
  catch (err) {
    console.log(err.message);
  };
};


module.exports = connectDB