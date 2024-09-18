const pool = require('../dbcon');

const uploadBook = async (bookData) => {
    const {
        BookID, BookOwner, title, author, price,
        quantity, rent_quantity, catagory, cover, book_status
    } = bookData;

    const query = `
        INSERT INTO books (
            book_id, book_owner, book_title, author, 
            price, total_quantity, rent_quantity, 
            catagory, book_cover, book_status
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    const values = [BookID, BookOwner, title, author, price, quantity, rent_quantity, catagory, cover, book_status];

    return await pool.query(query, values);
};

const getAllBooks = async () => {
    const query = 'SELECT * FROM books';
    return await pool.query(query);
};

const getOwnerBooks = async (Owner) => {
    const query = 'SELECT * FROM books WHERE book_owner = $1';
    const result = await pool.query(query, [Owner]);
    return result;
};

 

const acceptBookUpdate = async (book_id, book_status) => {
    console.log("Book ID:", book_id)
    try{
    const result = await pool.query(
            'UPDATE books SET book_status = $1 WHERE book_id = $2 RETURNING *',
            [book_status, book_id]
        );
        return result;
    }catch(err){
        return err;
    }
};

const rejectBookUpdate = async (book_id, book_status) => {
    const result = await pool.query(
        'UPDATE books SET book_status = $1 WHERE book_id = $2 RETURNING *',
        [book_status, book_id]
      );
    return result;
};

const newRents = async () => {
    const query = 'SELECT * FROM rents JOIN books ON rents.book_id = books.book_id JOIN users ON rents.renter_id = users.user_id;';
    return await pool.query(query);
};

const acceptRentUpdate = async (renter_id, book_id, book_status) => {
    try{
    const result = await pool.query(
            'UPDATE rents SET request_status = $1 WHERE renter_id = $2 AND book_id = $3 RETURNING *',
            [book_status, renter_id, book_id]
        );
        return result;
    }catch(err){
        return err;
    }
};

const rejectRentUpdate = async (renter_id, book_id, book_status) => {
    const result = await pool.query(
        'UPDATE rents SET request_status = $1 WHERE renter_id = $2 AND book_id = $3 RETURNING *',
            [book_status, renter_id, book_id]
      );
    return result;
};

module.exports = {
    uploadBook,
    getAllBooks,
    acceptBookUpdate,
    rejectBookUpdate,
    newRents,
    acceptRentUpdate,
    rejectRentUpdate,
    getOwnerBooks,
};
