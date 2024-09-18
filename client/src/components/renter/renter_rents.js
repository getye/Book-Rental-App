
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Paper, IconButton, InputBase, Typography } from '@mui/material'
import {useState, useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';


export const RenterRents = () => {
  
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null);

    const getData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
      try {
        const response = await fetch('http://localhost:8001/renter/rents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch book information');
        }
  
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message); 
      }
    };

      useEffect(() => {
        getData(); // Call the function to fetch data
    }, []);


    return ( 
      <Box sx={{ paddingTop: "5%", marginLeft: "20%", justifyContent:'center' }}>
        <Box sx={{ paddingTop:2}}>
              <Paper 
                sx={{ 
                    display: 'flex', 
                    width: "45%", 
                    border: 1, 
                    height:'1%',
                    borderRadius: 4, 
                    borderColor: 'blue', 
                    mb: 1 }}>
                  <IconButton sx={{ p: '6px', color:'blue' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      size='small'
                      placeholder="Search"
                      />
              </Paper>
        </Box>
        
        { (books.length!==0)? (
          <Table sx={{ maxWidth: 0.9, border: 'black'}}>
          <TableHead sx={{alignContent:'center'}}>
            <TableRow sx={{ bgcolor: 'blue'}}>
              <TableCell 
                  sx={{ 
                    padding: '5px', 
                    color: 'white', 
                    textAlign: 'center'  
                    }}>
                      No
              </TableCell>
              <TableCell 
                  sx={{ 
                    padding: '5px', 
                    color: 'white', 
                    textAlign: 'center'  
                    }}>
                      Book Title
              </TableCell>
              <TableCell 
                  sx={{ 
                    padding: '5px', 
                    color: 'white', 
                    textAlign: 'center'  
                    }}>
                      Duration
              </TableCell>
              <TableCell 
                  sx={{ 
                    padding: '5px', 
                    color: 'white', 
                    textAlign: 'center'  
                    }}>
                      Start Date
              </TableCell>
              <TableCell 
                  sx={{ 
                    padding: '5px', 
                    color: 'white', 
                    textAlign: 'center'  
                    }}>
                      End Date
              </TableCell>
              <TableCell 
                  sx={{ 
                    padding: '5px', 
                    color: 'white', 
                    textAlign: 'center'  
                    }}>
                      Total Fee
              </TableCell>
              <TableCell 
                  sx={{ 
                    padding: '5px', 
                    color: 'white', 
                    textAlign: 'center'  
                    }}>
                      Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book, index) => (
                <TableRow
                          key={book.id}
                          sx={{
                            alignItems: 'center',
                            height: '40px',
                            bgcolor: index % 2 === 0 ? '#E0E5E5' : '#EBF4FA', // Striped effect
                          }}
                        >
                <TableCell 
                    sx={{ padding: '0px', textAlign: 'center'  }}>
                    {++index}
                </TableCell>
                <TableCell 
                    sx={{ padding: '0px', textAlign: 'center'  }}>
                    {book.book_title} 
                </TableCell>
                <TableCell 
                    sx={{ padding: '0px', textAlign: 'center'  }}>
                    {book.duration} days
                </TableCell>
                <TableCell 
                    sx={{ padding: '0px', textAlign: 'center'  }}>
                    {book.rent_date}
                </TableCell>
                <TableCell 
                    sx={{ padding: '0px', textAlign: 'center'  }}>
                    {book.end_date}
                </TableCell>
                <TableCell 
                    sx={{ padding: '0px', textAlign: 'center'  }}>
                      {book.total_fee}
                </TableCell>
                <TableCell 
                    sx={{ padding: '0px', textAlign: 'center', color:"white",
                      bgcolor: book.request_status === "Pending" ? '#FFA500' : 
                             book.request_status === "Accepted" ? '#008000': '#FF0000',
                      }}>
                      {book.request_status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        ): (
          <>
          <Typography>You have no rent</Typography>
          {error && <Typography>{error}</Typography>}
          </>
        )}
     </Box>
     );
}
 
