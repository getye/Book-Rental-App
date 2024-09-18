// routes.js
const express = require('express');
const statisticsRouter = express.Router();
const protect = require('../middleware/auth');
const StatisticsController = require('../controllers/statisticsController'); // Import the controller

// Define the route for statistics
statisticsRouter.get('/admin/dashboard', StatisticsController.rentStatistics);
statisticsRouter.get('/admin/dashboard/book-types', StatisticsController.getBookTypesStatistics);
statisticsRouter.get('/admin/dashboard/earnings', StatisticsController.getEarningsByCategory);
statisticsRouter.get('/admin/dashboard/monthly-earnings', StatisticsController.getEarnings);
statisticsRouter.get('/owner/dashboard/book-types', protect, StatisticsController.ownerGetBooks);
statisticsRouter.get('/owner/dashboard/monthly-earnings', protect, StatisticsController.ownerEarnings);
statisticsRouter.get('/renter/dashboard/book-types', protect, StatisticsController.rentStatus);
statisticsRouter.get('/renter/dashboard/monthly-fees', protect, StatisticsController.renterFees);


module.exports = statisticsRouter;
