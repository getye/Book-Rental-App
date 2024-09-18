import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, Typography, IconButton, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { Today } from '@mui/icons-material';

export const BookDetailsModal = ({ open, handleClose, selectedBook }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Get the difference in time (milliseconds)
    const timeDifference = end.getTime() - start.getTime();

    // Convert time difference from milliseconds to days
    const durationInDays = timeDifference / (1000 * 3600 * 24);
    const duration = Math.floor(durationInDays);
    try{
    dispatch({
        type: 'SUBMIT_RENTAL_REQUEST',
        payload: {
          book_id: selectedBook.book_id,
          startDate,
          endDate,
          duration, 
        }
    });
    setNotificationMessage('Request sent successfully');
    setShowNotification(true); // Show notification after submission
    handleClose(); // Close the modal after submission
    }catch(err){
      setNotificationMessage('Request not sent', err);
      setShowNotification(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 0.5, bgcolor: 'background.paper', p: 4 }}>
          <IconButton sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }} onClick={handleClose}>
            <CancelSharpIcon sx={{width:35, height:35}}/>
          </IconButton>
          {selectedBook ? (
            <>
              <Typography variant="h5">{selectedBook.book_title}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ mt: 2 }}><strong>Category:</strong> {selectedBook.catagory}</Typography>
                  <Typography sx={{ mt: 2 }}><strong>Owner:</strong> {selectedBook.book_owner}</Typography>
                  <Typography sx={{ mt: 2 }}><strong>Author:</strong> {selectedBook.author}</Typography>
                  <Typography sx={{ mt: 2 }}><strong>Price:</strong> {selectedBook.price} ETB/day</Typography>
                </Grid>
                <Grid item xs={6}>
                  <img src={`http://localhost:8001/uploads/${selectedBook.book_cover}`} alt="Book Cover" style={{ width: '50%', height: '70%' }} />
                </Grid>
              </Grid>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, paddingRight:9}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                  <TextField
                      type="date"
                      label="Start Date"
                      inputProps={{ min: Today }}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      size="small"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{width:0.4}}
                    />
                    <Typography>To</Typography>
                    <TextField
                      type="date"
                      label="End Date"
                      inputProps={{ min: Today }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      size="small"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{width:0.4}}
                    />
                </Box>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, display: "block" }}>
                      Submit
                    </Button>
                  </Box>
              </Box>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>

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
          severity={notificationMessage.includes('Request sent successfully') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
