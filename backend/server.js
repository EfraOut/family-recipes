const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recipesRoutes = require('./routes/recipeRoutes');
const cors = require('cors');

// Allowed frontends
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_ORIGIN,
];

// If you also want to allow Netlify preview/branch deploys, use a function:
const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // allow tools/curl
    if (allowedOrigins.includes(origin) || /\.netlify\.app$/.test(new URL(origin).host)) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: false,
};


// Load environment variables
dotenv.config();
const app = express();

app.use(cors({origin: ['http://localhost:3000', process.env.FRONTEND_ORIGIN], credentials: false}));
app.use(cors({ origin: (o, cb) => cb(null, !o || allowed.includes(o)), credentials: false }));
app.use(cors(corsOptions));

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
