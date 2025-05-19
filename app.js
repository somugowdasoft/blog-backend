require("dotenv").config();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
connectDB();

//Initialize
const app = express();

//Middleware
app.use(cors({
    origin: process.env.FRONTEND_API,
    credentials: true
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', blogRoutes);

//Port from env
const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT, () => {
    console.log(`Server running on ythe http://localhost:${PORT}`);
});
