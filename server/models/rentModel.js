const pool = require('../dbcon');

// Fetch book price by book ID
const getBookPriceById = async (book_id) => {
  const query = 'SELECT price FROM books WHERE book_id = $1';
  const result = await pool.query(query, [book_id]);
  return result.rows.length ? result.rows[0].price : null;
};

// Update rent quantity of a book
const updateBookQuantity = async (book_id) => {
  const query = 'UPDATE books SET rent_quantity = rent_quantity + 1 WHERE book_id = $1';
  await pool.query(query, [book_id]);
};

// Create a new rent
const insertRent = async (rent_id, renter_id, book_id, duration, rent_date_str, end_date_str, total_fee, request_status) => {
  const query = `
    INSERT INTO rents (rent_id, renter_id, book_id, duration, rent_date, end_date, total_fee, request_status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const result = await pool.query(query, [rent_id, renter_id, book_id, duration, rent_date_str, end_date_str, total_fee, request_status]);
  return result.rows[0];
};

// Fetch rent by renter ID
const getRentsByRenterId = async (renter_id) => {
  const query = 'SELECT rents.*, books.book_title FROM rents JOIN books ON rents.book_id = books.book_id WHERE rents.renter_id = $1;';
  
  const result = await pool.query(query, [renter_id]);
  return result.rows;
};

module.exports = {
  getBookPriceById,
  updateBookQuantity,
  insertRent,
  getRentsByRenterId,
};
