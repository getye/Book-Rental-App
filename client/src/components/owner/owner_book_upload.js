import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, IconButton, Autocomplete, Divider, Snackbar, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const OwnerBookUpload = () => {
  const [formData, setFormData] = useState({
    bookTitle: '',
    bookAuthor: '',
    bookPrice: '',
    bookQuantity: '',
    selectedBook: null,
    bookCover: null,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverUpload = (event) => {
    setFormData((prev) => ({ ...prev, bookCover: event.target.files[0] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { bookCover } = formData;

    // Check if a book cover is selected
    if (!bookCover) {
      setNotificationMessage('Please upload a book cover');
      setShowNotification(true);
      return; // Stop the submission
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.bookTitle);
    formDataToSubmit.append('author', formData.bookAuthor);
    formDataToSubmit.append('price', formData.bookPrice);
    formDataToSubmit.append('quantity', formData.bookQuantity);
    formDataToSubmit.append('catagory', formData.selectedBook);
    formDataToSubmit.append('cover', bookCover);

    const token = localStorage.getItem('token'); // Retrieve the token from storage
    if (!token) {
      console.log('No token found, please log in');
      return;
    }

    const response = await fetch('http://localhost:8001/owner/book/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token
      },
      body: formDataToSubmit,
    });

    if (response.ok) {
      setNotificationMessage('Book uploaded successfully');
      setShowNotification(true);
      // Clear form fields
      setFormData({
        bookTitle: '',
        bookAuthor: '',
        bookPrice: '',
        bookQuantity: '',
        selectedBook: null,
        bookCover: null,
      });
    } else {
      const errorMessage = await response.json();
      setNotificationMessage(errorMessage.message || 'Error uploading book');
      setShowNotification(true);
    }
  };

  const bookOptions = [
    { label: 'Fiction', value: 'Fiction' },
    { label: 'Self Help', value: 'Self Help' },
    { label: 'Business', value: 'Business' },
  ];

  return (
    <Box sx={{ paddingLeft: 32, paddingTop: 10 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          maxWidth: 0.68,
        }}
      >
        <Typography variant="h5" gutterBottom pb={1}>
          Add a New Book
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={5.6}>
            <TextField
              label="Book Title"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              fullWidth
              sx={{ paddingBottom: 2 }}
              size="small"
              required
            />
            <TextField
              label="Book Author"
              name="bookAuthor"
              value={formData.bookAuthor}
              onChange={handleChange}
              fullWidth
              sx={{ paddingBottom: 2 }}
              size="small"
              required
            />
            <TextField
              label="Book Price"
              type="number"
              name="bookPrice"
              value={formData.bookPrice}
              onChange={handleChange}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ ml: 2 }} />
          <Grid item xs={5.6}>
            <TextField
              label="Book Quantity"
              type="number"
              name="bookQuantity"
              value={formData.bookQuantity}
              onChange={handleChange}
              fullWidth
              sx={{ paddingBottom: 2 }}
              size="small"
              required
            />
            <Autocomplete
              disablePortal
              id="catagory"
              size="small"
              sx={{ paddingBottom: 2 }}
              required
              value={formData.selectedBook}
              options={bookOptions}
              fullWidth
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              renderInput={(params) => <TextField {...params} label="Book Category" />}
              onInputChange={(event, newInputValue) => {
                setFormData((prev) => ({ ...prev, selectedBook: newInputValue }));
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                accept="image/*"
                id="book-cover-upload"
                name="cover"
                type="file"
                onChange={handleCoverUpload}
                style={{ display: 'none' }}
              />
              <Box
                sx={{
                  border: 1,
                  width: '100%',
                  borderColor: '#ccc',
                  borderRadius: 2,
                }}
              >
                <label htmlFor="book-cover-upload">
                  <IconButton
                    component="span"
                    size="small"
                    color="primary"
                  >
                    <CloudUploadIcon />
                    {formData.bookCover ? formData.bookCover.name : ' Upload Book Cover'}
                  </IconButton>
                </label>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity={notificationMessage.includes('Book uploaded successfully') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};