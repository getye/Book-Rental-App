import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest, setSearchTerm, updateUserStatus } from '../../services/actions/userActions';
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Paper, InputBase, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const ViewUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error, searchTerm } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleStatusChange = (user) => {
    const newStatus = user.user_status === "Active" ? "Inactive" : "Active";
    dispatch(updateUserStatus(user.user_id, newStatus));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ paddingTop: "5%", marginLeft: "20%", justifyContent: 'center' }}>
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
                    value={searchTerm}
                    onChange={handleSearchChange}
                    />
            </Paper>
        </Box>
      <Table sx={{ maxWidth: 0.9, border: 'black' }}>
        <TableHead sx={{ alignContent: 'center' }}>
          <TableRow sx={{ bgcolor: 'blue' }}>
            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>No</TableCell>
            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>User Name</TableCell>
            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Email</TableCell>
            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Location</TableCell>
            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>User Type</TableCell>
            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Status</TableCell>
            <TableCell sx={{ padding: '5px', color: 'white', textAlign: 'center' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center' }}>Loading...</TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', color: 'red' }}>{error}</TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user, index) => (
              <TableRow key={user.user_id} sx={{ alignItems: 'center', height: '40px', bgcolor: index % 2 === 0 ? '#E0E5E5' : '#EBF4FA' }}>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{index + 1}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{user.user_name}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{user.user_email}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{user.user_location}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center' }}>{user.user_type}</TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center', color: 'white', bgcolor: user.user_status === "Active" ? '#008000' : '#FF0000' }}>
                  {user.user_status}
                </TableCell>
                <TableCell sx={{ padding: '0px', textAlign: 'center'  }}>
                 {  user.user_status === "Active" ? (
                    <Tooltip title="Block User">
                      <IconButton onClick={() => handleStatusChange(user)}>
                        <CloseOutlinedIcon sx={{color:'red'}}/>
                      </IconButton>
                    </Tooltip>
                  ):(
                    <Tooltip title="Unblock User">
                      <IconButton onClick={() => handleStatusChange(user)}>
                        <DoneOutlinedIcon sx={{color:'green'}}/>
                      </IconButton>
                    </Tooltip>
                    
                  )}
              </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};