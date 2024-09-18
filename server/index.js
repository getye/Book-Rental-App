const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');
require('dotenv').config();
const path = require('path');
const renterRouter = require('./routes/rentRoutes');
const statisticsRouter = require('./routes/statisticsRouter')

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: 'http://localhost:3000', // Change this to your React app's URL
  credentials: true
}));

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/', userRouter);
app.use('/', bookRouter);
app.use('/', renterRouter);
app.use('/', statisticsRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
