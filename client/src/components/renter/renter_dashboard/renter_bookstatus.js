import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentStatusRequest } from '../../../services/actions/statisticsActions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RenterBookStatus = () => {
  const dispatch = useDispatch();
  const { bookCategoryCounts, loading, error } = useSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(fetchRentStatusRequest()); // Fetch book category counts
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("bookCategoryCounts:", bookCategoryCounts); // Check the structure

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={bookCategoryCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" barSize={30} name="Total Quantity" />
      </BarChart>
    </ResponsiveContainer>
  );
};
