const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recipesRoutes = require('./routes/recipeRoutes');
const cors = require('cors');

// Allowed frontends
const allowed = [
  'http://localhost:3000',
  process.env.FRONTEND_ORIGIN
];

// Load environment variables
dotenv.config();
const app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: false}));
app.use(cors({ origin: (o, cb) => cb(null, !o || allowed.includes(o)), credentials: false }));

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

// Making the app Render-friendly
app.get('/healthz', (_, res) => res.status(200).json({ ok: true }));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
