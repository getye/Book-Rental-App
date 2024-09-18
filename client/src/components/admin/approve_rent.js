import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHead, TableRow, TableCell, TableBody, Box, IconButton, Dialog, DialogTitle, DialogContent, Grid, Tooltip, Paper, InputBase } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import SearchIcon from '@mui/icons-material/Search';
import { 
    fetchRentsRequest, 
    acceptRentRequest, 
    rejectRentRequest,
    updateSearchTerm, 
    } from '../../services/actions/rentalActions';

export const ApproveRent = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const { filteredRents, loading, error } = useSelector(state => state.rental); // Redux state

    useEffect(() => {
        dispatch(fetchRentsRequest()); // Dispatch to fetch rents
    }, [dispatch]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
        dispatch(updateSearchTerm(searchTerm));
    };


    const handleRowClick = (rent) => {
        setSelectedBook(rent);
        setOpenModal(true);
    };

    const handleAccept = (event, renter_id, book_id) => {
        event.stopPropagation();
        dispatch(acceptRentRequest(renter_id, book_id)); // Dispatch accept action
    };

    const handleReject = (event, renter_id, book_id) => {
        event.stopPropagation();
        dispatch(rejectRentRequest(renter_id, book_id)); // Dispatch reject action
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedBook(null);
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <Box sx={{ marginLeft: "20%", paddingTop: "5%", justifyContent: 'center' }}>
            
            <Box sx={{ paddingTop: 2 }}>
                <Paper sx={{ display: 'flex', width: "45%", border: 1, borderRadius: 4, borderColor: 'blue', mb: 1 }}>
                    <IconButton sx={{ p: '6px', color: 'blue' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        size='small'
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                </Paper>
            </Box>

            <Table sx={{ maxWidth: 0.9, border: 'black' }}>
                <TableHead>
                <TableRow sx={{ bgcolor: 'blue' }}>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>No</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Title</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Renter Name</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Start Date</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>End Date</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Cover</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Status</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Approve</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {filteredRents.map((rent, index) => (
                        <Tooltip title={`Click to view details of ${rent.book_title}`} arrow key={rent.book_id}>
                            <TableRow
                                key={index}
                                sx={{
                                    alignItems: 'center',
                                    height: '40px',
                                    bgcolor: index % 2 === 0 ? '#E0E5E5' : '#EBF4FA',
                                }}
                                onClick={() => handleRowClick(rent)} 
                            >
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{rent.book_title}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{rent.user_name}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{rent.rent_date}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{rent.end_date}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>
                                    <img
                                        src={`http://localhost:8001/uploads/${rent.book_cover}`}
                                        alt='Book Cover'
                                        style={{ width: '20px', height: '25px' }}
                                    />
                                </TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center', color: 'white', bgcolor: rent.request_status === "Pending" ? '#FFA500' : rent.request_status=== "Accepted" ? '#008000' : '#FF0000' }}>
                                    {rent.request_status}
                                </TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>
                                    <IconButton title='Accept' onClick={(event) => handleAccept(event, rent.renter_id, rent.book_id)}>
                                        <DoneOutlinedIcon sx={{ color: 'green' }} />
                                    </IconButton>
                                    <IconButton title='Reject' onClick={(event) => handleReject(event, rent.renter_id, rent.book_id)}>
                                        <CloseOutlinedIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </Tooltip>
                    ))}
                </TableBody>
            </Table>

            {/* Modal for detailed view */}
            <Dialog 
                open={openModal} 
                onClose={handleCloseModal}
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: '70%', maxWidth:'100%' } }}
            >
                <IconButton title='Close' sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }} onClick={handleCloseModal}>
                    <CancelSharpIcon sx={{width:35, height:35}} />
                </IconButton>
                <DialogTitle color={'blueviolet'}>Rent Details</DialogTitle>
                <DialogContent>
                    {selectedBook && (
                        <Box>
                            <Grid container>
                                <Grid item xs={4}>
                                    <p><strong>Title:</strong> {selectedBook.book_title}</p>
                                    <p><strong>Owner:</strong> {selectedBook.book_owner}</p>
                                    <p><strong>Author:</strong> {selectedBook.author}</p>
                                    <p><strong>Price:</strong> {selectedBook.price}</p>
                                    <p><strong>Total Quantity:</strong> {selectedBook.total_quantity}</p>
                                    <p><strong>Rent Quantity:</strong> {selectedBook.rent_quantity}</p>                    
                                    <p><strong>Available Books:</strong> {selectedBook.total_quantity - selectedBook.rent_quantity}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <img
                                        src={`http://localhost:8001/uploads/${selectedBook.book_cover}`}
                                        alt='Book Cover'
                                        style={{ width: '150px', height: '200px' }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <p><strong>Renter Name:</strong> {selectedBook.user_name}</p>
                                    <p><strong>Email:</strong> {selectedBook.user_email}</p>
                                    <p><strong>Rent Days:</strong> {selectedBook.duration}</p>
                                    <p><strong>Start Date:</strong> {selectedBook.rent_date}</p>
                                    <p><strong>End Date:</strong> {selectedBook.end_date}</p>
                                    <p><strong>Total Fee:</strong> {selectedBook.total_fee}</p>
                                    <p><strong>Location:</strong> {selectedBook.user_location}</p>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};
