const express = require('express');
const multer = require('multer');
const path = require('path');
const BookController = require('../controllers/BookController');
const authenticateToken = require('../middleware/auth');
const protect = require('../middleware/auth');

const bookRouter = express.Router();

// Configure Multer for file uploads
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}_${file.originalname}`;
        cb(null, filename);
    }
});

var upload = multer({ storage });

// Routes
bookRouter.post('/owner/book/upload', protect, upload.single("cover"), BookController.uploadBook);
bookRouter.get('/admin/books', BookController.getBooks);
bookRouter.get('/admin/approve/books', BookController.getBooks);
bookRouter.put('/admin/approve/book/accept/:book_id', BookController.acceptBook);
bookRouter.put('/admin/approve/book/reject/:book_id', BookController.rejectBook);
bookRouter.get('/renter/books', BookController.getBooks);
bookRouter.get('/admin/approve/rents', BookController.getNewRent);
bookRouter.put('/admin/approve/rent/accept', BookController.acceptRent);
bookRouter.put('/admin/approve/rent/reject', BookController.rejectRent);
bookRouter.get('/owner/view/books', protect, BookController.ownerViewBooks);

module.exports = bookRouter;