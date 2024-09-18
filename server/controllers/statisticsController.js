const StatisticsModel = require('../models/statisticsModel'); // Import the model

const rentStatistics = async (req, res) => {
  try {
    const counts = await StatisticsModel.getCounts(); // Call the model to get counts

    return res.status(200).json(counts); // Send the counts as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookTypesStatistics = async (req, res) => {
  try {
    const bookTypes = await StatisticsModel.getBookTypesCount(); // Fetch from model
    return res.status(200).json(bookTypes); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching book types:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getEarningsByCategory = async (req, res) => {
  try {
    const earnings = await StatisticsModel.getEarningsByCategory(); // Fetch from model
    return res.status(200).json(earnings); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching earnings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const getEarnings = async (req, res) => {
  try {
    const earnings = await StatisticsModel.getEarningsOverTime();
    return res.status(200).json(earnings);
  } catch (error) {
    console.error('Error fetching earnings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const ownerEarnings = async (req, res) => {
  const BookOwner = req.user.userName;
  try {
    const earnings = await StatisticsModel.ownerEarningsOverTime(BookOwner);
    return res.status(200).json(earnings);
  } catch (error) {
    console.error('Error fetching earnings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const ownerGetBooks = async (req, res) => {
  const BookOwner = req.user.userName;
  try {
    const NoBooks = await StatisticsModel.ownerGetBooks(BookOwner); // Fetch from model
    console.log("Number of books",NoBooks)
    return res.status(200).json(NoBooks); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching book types:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const rentStatus = async (req, res) => {
  const id = req.user.userId;
  try {
    const NoBooks = await StatisticsModel.renterRentStatus(id); // Fetch from model
    console.log("Number of books",NoBooks)
    return res.status(200).json(NoBooks); // Send the data to the frontend
  } catch (error) {
    console.error('Error fetching book types:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const renterFees = async (req, res) => {
  const id = req.user.userId;
  try {
    const fees = await StatisticsModel.renterFees(id);
    console.log("Total fees: ", fees)
    return res.status(200).json(fees);
  } catch (error) {
    console.error('Error fetching fees:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { 
    rentStatistics, 
    getBookTypesStatistics,
    getEarningsByCategory,
    getEarnings,
    ownerGetBooks,
    ownerEarnings,
    rentStatus,
    renterFees,
     };

