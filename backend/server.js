const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recipesRoutes = require('./routes/recipeRoutes')

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api/recipes', recipesRoutes);

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

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
