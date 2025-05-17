require("dotenv").config();

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();
connectDB();

//Initialize
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

//Port from env
const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT, () => {
    console.log(`Server running on ythe hhttp://localhost:${PORT}`);
});
