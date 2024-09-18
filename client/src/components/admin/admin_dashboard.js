import { Box, Grid, Button, Typography } from "@mui/material";
import BookTypesChart from "./admin_dashboard/book_types";
import { EarningsLineChart } from "./admin_dashboard/earning_linegraph";
import { Earnings } from "./admin_dashboard/earnings";
import { Statistics } from "./admin_dashboard/statistics";
import { useEffect, useState } from "react";
import axios from "axios";

export const AdminDashboard = () => {
  const [counts, setCounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Manage current page (now 1-4)

  // Fetch book category counts
  useEffect(() => {
    const fetchBookCounts = async () => {
      try {
        const response = await axios.get('http://localhost:8001/admin/dashboard/book-types'); // Adjust API route
        setCounts(response.data); // Assuming the data is in response.data
      } catch (error) {
        console.error('Error fetching book category counts:', error);
      }
    };
    fetchBookCounts();
  }, []);

  // Handle page navigation
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 4)); // Max page is 4 now
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Min page is 1
  };

  return (
    <>
      
      {currentPage === 1 && (
        <Grid container sx={{ paddingTop: 10, alignItems: 'center', alignContent: 'center', paddingLeft: 32 }}>
          <Grid item xs={11} direction={'column'} sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <Typography>Earnings Graph Per Month</Typography>
            <EarningsLineChart />
          </Grid>
        </Grid>
      )}

      
      {currentPage === 2 && (
        <Grid container sx={{ paddingTop: 10, alignItems: 'center', alignContent: 'center', paddingLeft: 32 }}>
          <Grid item xs={10} direction={'column'} sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <Typography>Number of Users and Books</Typography>
            <Statistics />
          </Grid>
        </Grid>
      )}

      
      {currentPage === 3 && (
        <Grid container sx={{ paddingTop: 10, alignItems: 'center', alignContent: 'center', paddingLeft: 32 }}>
          <Grid item xs={10} direction={'column'}>
          <Typography sx={{pl:8}}>Number of Books in each Category</Typography>
          <BookTypesChart data={counts} />
          </Grid>
        </Grid>
      )}

    
      {currentPage === 4 && (
        <Grid container sx={{ paddingTop: 10, alignItems: 'center', alignContent: 'center', paddingLeft: 32 }}>
          <Grid item xs={10} direction={'column'}>
          <Typography sx={{pl:8}}>Earnings Per Book Category</Typography>
          <Earnings />
          </Grid>
        </Grid>
      )}

      {/* Next and Previous Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4, paddingLeft: 32, paddingRight: 5 }}>
        <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNextPage} disabled={currentPage === 4}>
          Next
        </Button>
      </Box>
    </>
  );
};
