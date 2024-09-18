
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Paper, IconButton, InputBase, Tooltip} from '@mui/material'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { 
  renterFetchBooksRequest,
  setSearchTerm
    } from '../../services/actions/bookActions';
import { BookDetailsModal } from './renter_rent_book';
  
    
   export const RenterBooks = () => {
      const dispatch = useDispatch();
      const [search, setSearch] = useState('');
      const { loading, books, error } = useSelector(state => state.books);
      
      //modal
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedBook, setSelectedBook] = useState(null);
      
        // Open modal with selected book
        const handleOpen = (book) => {
          setSelectedBook(book);
          setModalOpen(true);
        };

        // Close modal
        const handleCloseModal = () => {
          setModalOpen(false);
          setSelectedBook(null); 
        };


      useEffect(() => {
        dispatch(renterFetchBooksRequest());
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
                height: '1%',
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
                <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Category</TableCell>
                <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Price</TableCell>
                <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Book Cover</TableCell>
                <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book, index) => (
                <TableRow
                  key={book.id}
                  sx={{
                    alignItems: 'center',
                    height: '40px',
                    bgcolor: index % 2 === 0 ? '#E0E5E5' : '#EBF4FA',
                  }}
                >
                  <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.book_title}</TableCell>
                  <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.book_owner}</TableCell>
                  <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.author}</TableCell>
                  <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.catagory}</TableCell>
                  <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{book.price}</TableCell>
                  <TableCell sx={{ padding: '0px', textAlign: 'center' }}>
                    <img src={`http://localhost:8001/uploads/${book.book_cover}`} alt='Book Cover' style={{ width: '20px', height: '25px' }} />
                  </TableCell>
                  <TableCell sx={{ padding: '0px', textAlign: 'center' }}>
                    <Tooltip title="Rent this book?">
                      <IconButton onClick={() => handleOpen(book)}>
                        <DoneAllOutlinedIcon sx={{color:'blue'}}/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Modal for displaying book details */}
              <BookDetailsModal 
                open={modalOpen}
                handleClose={handleCloseModal}
                selectedBook={selectedBook}
                />

        </Box>
      );
    };
    
  
 
