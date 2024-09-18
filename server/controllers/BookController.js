const { v4: uuidv4 } = require('uuid');
const BookModel = require('../models/BookModel');
const path = require('path');

const uploadBook = async (req, res) => {
    const BookID = uuidv4();
    const BookOwner = req.user.userName; // Extract userName from the decoded JWT
    const rent_quantity = 0;
    const { title, author, price, quantity, catagory } = req.body;
    const cover = req.file.filename; // Store only the filename
    const book_status = "Pending";

    try {
        await BookModel.uploadBook({
            BookID, BookOwner, title, author, price,
            quantity, rent_quantity, catagory, cover, book_status 
        });
        res.status(201).json({ message: 'Book uploaded successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error uploading book', error: err.message });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await BookModel.getAllBooks();
        const formattedBooks = books.rows.map(book => ({
            ...book,
            book_cover: path.basename(book.book_cover) // Only send the filename
        }));
        res.json(formattedBooks);
        //res.json(books.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving books', error: err.message });
    }
};


const ownerViewBooks = async (req, res) => {
    try {
        const Owner = req.user.userName;
        const books = await BookModel.getOwnerBooks(Owner);
        const formattedBooks = books.rows.map(book => ({
            ...book,
            book_cover: path.basename(book.book_cover) // Only send the filename
        }));
        res.json(formattedBooks);
        //res.json(books.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving books', error: err.message });
    }
};


const acceptBook = async (req, res) => {
    const { book_id } = req.params;
    const book_status = "Accepted";
    try {
        const updatedBookStatus = await BookModel.acceptBookUpdate(book_id, book_status);
        console.log('Updated Book in Database:', updatedBookStatus.rows[0]);
        res.json(updatedBookStatus.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error to approve', error: err.message });
    }
};

const rejectBook = async (req, res) => {
    const { book_id } = req.params;
    const book_status = "Rejected";
    try {
        const updatedBookStatus = await BookModel.rejectBookUpdate(book_id, book_status);
        res.json(updatedBookStatus.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error to approve', error: err.message });
    }
};

const getNewRent = async (req, res) => {
    try {
        const books = await BookModel.newRents();
        const formattedBooks = books.rows.map(book => ({
            ...book,
            book_cover: path.basename(book.book_cover) // Only send the filename
        }));
        res.json(formattedBooks);
        //res.json(books.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving books', error: err.message });
    }
};

const acceptRent = async (req, res) => {
    const { renter_id, book_id } = req.body;
    const book_status = "Accepted";
    try {
        const updatedBookStatus = await BookModel.acceptRentUpdate(renter_id, book_id, book_status);
        console.log('Updated Book in Database:', updatedBookStatus.rows[0]);
        res.json(updatedBookStatus.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error to approve', error: err.message });
    }
};

const rejectRent = async (req, res) => {
    const { renter_id, book_id } = req.body;
    const book_status = "Rejected";
    try {
        const updatedBookStatus = await BookModel.rejectRentUpdate(renter_id, book_id, book_status);
        res.json(updatedBookStatus.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error to approve', error: err.message });
    }
};


module.exports = {
    uploadBook,
    getBooks,
    acceptBook,
    rejectBook,
    getNewRent,
    acceptRent,
    rejectRent,
    ownerViewBooks,
};
