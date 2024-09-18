const { v4: uuidv4 } = require('uuid');
const rentModel = require('../models/rentModel');

const createRent = async (req, res) => {
  try {
    const rent_id = uuidv4();
    const renter_id = req.user.userId; // JWT middleware ensures req.user is populated
    const { book_id,startDate, endDate, duration } = req.body;
    

    // Ensure all required fields are present
    if (!book_id || !startDate || !endDate) {
      return res.status(400).json({ error: 'Book ID and duration are required.' });
    }

    // Get book price
    const price = await rentModel.getBookPriceById(book_id);
    if (!price) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    // Calculate total fee
    const total_fee = price * duration;

    //Request status initialy padding
    const request_status = "Pending";

    // Update book quantity
    await rentModel.updateBookQuantity(book_id);

    // Insert rent into the rents table
    const newRent = await rentModel.insertRent(
          rent_id, 
          renter_id, 
          book_id, 
          duration, 
          startDate, 
          endDate, 
          total_fee, 
          request_status
        );

    res.status(201).json(newRent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRentById = async (req, res) => {
  try {
    const renter_id = req.user.userId; // JWT middleware ensures req.user is populated
    const rents = await rentModel.getRentsByRenterId(renter_id);

    if (!rents.length) {
      return res.status(404).json({ message: 'No rents found for this user' });
    }

    res.status(200).json(rents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rent details', error });
  }
};

module.exports = {
  createRent,
  getRentById,
};
