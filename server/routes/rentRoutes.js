// routes/rentRoutes.js
const express = require('express');
const { createRent, getRentById } = require('../controllers/rentController');
const authenticateJWT = require('../middleware/auth');
const renterRouter = express.Router();

// Route for creating a new rent
renterRouter.post('/renter/book/rent',authenticateJWT, createRent);

// Route for fetching rent details by id
renterRouter.get('/renter/rents', authenticateJWT, getRentById);

//renterRouter.get('/renter/dashboard', authenticateJWT, getRentById);

module.exports = renterRouter;
