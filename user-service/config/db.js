require('dotenv').config({ path: `../.env` })
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://root:example@localhost:27017', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
   } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
   }
};

module.exports = connectDB;