import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, IconButton, InputBase, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { adminFetchBooksRequest, setSearchTerm } from '../../services/actions/bookActions';

export const ViewBooks = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const { loading, books, error } = useSelector(state => state.books);

    useEffect(() => {
        dispatch(adminFetchBooksRequest());
    }, [dispatch]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        dispatch(setSearchTerm(event.target.value));
    };

    // Filter books based on the search query
    const filteredBooks = books.filter(book => 
        book.author.toLowerCase().includes(search.toLowerCase()) || 
        book.book_owner.toLowerCase().includes(search.toLowerCase()) || 
        book.book_title.toLowerCase().includes(search.toLowerCase()) || 
        book.book_status.toLowerCase().includes(search.toLowerCase()) ||
        book.catagory.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{ paddingTop: "5%", marginLeft: "20%", justifyContent: 'center' }}>
            <Box sx={{ paddingTop: 2 }}>
                <Paper
                    sx={{
                        display: 'flex',
                        width: "45%",
                        border: 1,
                        borderRadius: 4,
                        borderColor: 'blue',
                        mb: 1
                    }}
                >
                    <IconButton sx={{ p: '6px', color: 'blue' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        size='small'
                        placeholder="Search"
                        value={search} // Bind the search query
                        onChange={handleSearch} // Handle input changes
                    />
                </Paper>
            </Box>

            {books.length !== 0 ? (
                <Table sx={{ maxWidth: 0.95, border: 'black' }}>
                    <TableHead sx={{ alignContent: 'center' }}>
                        <TableRow sx={{ bgcolor: 'blue' }}>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>No</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Title</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Author</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Total Quantity</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Rent Quantity</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Available Books</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Rent Price</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Category</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Cover</TableCell>
                            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBooks.map((book, index) => (
                            <TableRow
                                key={book.id}
                                sx={{
                                    alignItems: 'center',
                                    height: '40px',
                                    bgcolor: index % 2 === 0 ? '#E0E5E5' : '#EBF4FA', // Striped effect
                                }}
                            >
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.book_title}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.author}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.total_quantity}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.rent_quantity}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.total_quantity - book.rent_quantity}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.price}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.catagory}</TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>
                                    <img src={`http://localhost:8001/uploads/${book.book_cover}`} alt='Book Cover' style={{ width: '20px', height: '25px' }} />
                                </TableCell>
                                <TableCell sx={{ padding: '0px', textAlign: 'center', color: 'white', bgcolor: book.book_status === "Pending" ? '#FFA500' : book.book_status === "Accepted" ? '#008000' : '#FF0000' }}>
                                    {book.book_status}
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Typography>You have no books</Typography>
            )}
        </Box>
    );
};
