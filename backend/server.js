const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


const PORT = process.env.PORT || 5000;

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
    connectDB();
  console.log(`Server running on port ${PORT}`);
});
