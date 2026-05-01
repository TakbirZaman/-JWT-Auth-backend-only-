const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// --- GLOBAL MIDDLEWARES ---
app.use(cors({
    origin: ['http://localhost:5173'], // Add your frontend URLs here
    credentials: true // Crucial for accepting cookies
}));
app.use(express.json());
app.use(cookieParser());

// --- ROUTES ---
// Mount the auth routes under the '/api' prefix
app.use('/api', authRoutes);

// --- BASE ROUTE ---
app.get('/', (req, res) => {
    res.send('JWT Auth Server is running!');
});

// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});