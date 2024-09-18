import { Table, TableHead, TableRow, TableCell, TableBody, Box, IconButton, InputBase, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { adminFetchBooksRequest, setSearchTerm } from '../../services/actions/bookActions';
import { useDispatch, useSelector } from 'react-redux';

export const ApproveBooks = () => {
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

    const handleAccept = async (book_id) => {
        try {
            const response = await fetch(`http://localhost:8001/admin/approve/book/accept/${book_id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
                return; // Exit if there's an error
            }

            const updatedBook = await response.json(); // Get the updated book data
            console.log('Updated Book:', updatedBook);

            // Update the Redux state to reflect the new book status
            dispatch(adminFetchBooksRequest()); // Fetch updated books again
          
        } catch (err) {
            console.log(err);
        }
    };

    const handleReject = async (book_id) => {
        try {
            const response = await fetch(`http://localhost:8001/admin/approve/book/reject/${book_id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
                return; // Exit if there's an error
            }

            const updatedBook = await response.json(); // Get the updated book data
            console.log('Updated Book:', updatedBook);

            // Update the Redux state to reflect the new book status
            dispatch(adminFetchBooksRequest()); // Fetch updated books again
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <Box sx={{ marginLeft: "20%", paddingTop: "5%", justifyContent: 'center' }}>
            <Box sx={{ paddingTop: 2 }}>
                <Paper
                    sx={{ 
                        display: 'flex', 
                        width: "45%", 
                        border: 1, 
                        borderRadius: 4, 
                        borderColor: 'blue', 
                        mb: 1 
                    }}>
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
            <Table sx={{ maxWidth: 0.9, border: 'black' }}>
                <TableHead sx={{ alignContent: 'center' }}>
                    <TableRow sx={{ bgcolor: 'blue' }}>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>No</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Title</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Owner</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Author</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Price</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Total Quantity</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Cover</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Status</TableCell>
                        <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Approve</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredBooks.map((book, index) => (
                        <TableRow
                            key={book.book_id}
                            sx={{
                                alignItems: 'center',
                                height: '40px',
                                bgcolor: index % 2 === 0 ? '#E0E5E5' : '#EBF4FA', // Striped effect
                            }}
                        >
                            <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{index + 1}</TableCell>
                            <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.book_title}</TableCell>
                            <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.book_owner}</TableCell>
                            <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.author}</TableCell>
                            <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.price}</TableCell>
                            <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.total_quantity}</TableCell>
                            <TableCell sx={{ padding: '0px', textAlign: 'center' }}>
                                <img
                                    src={`http://localhost:8001/uploads/${book.book_cover}`}
                                    alt='Book Cover'
                                    style={{ width: '20px', height: '25px' }}
                                />
                            </TableCell>
                            <TableCell sx={{ padding: '0px', textAlign: 'center', color: 'white', bgcolor: book.book_status === "Pending" ? '#FFA500' : book.book_status === "Accepted" ? '#008000' : '#FF0000' }}>
                                    {book.book_status}
                            </TableCell>
                            <TableCell sx={{ padding: '0px', textAlign: 'center' }}>
                                <IconButton title='Accept' onClick={() => handleAccept(book.book_id)}>
                                    <DoneOutlinedIcon sx={{ color: 'green' }} />
                                </IconButton>
                                <IconButton title='Reject' onClick={() => handleReject(book.book_id)}>
                                    <CloseOutlinedIcon sx={{ color: 'red' }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};