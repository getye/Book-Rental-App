import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookCountsRequest } from '../../../services/actions/statisticsActions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const OwnerBookStatus = () => {
  const dispatch = useDispatch();
  const { bookCategoryCounts, loading, error } = useSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(fetchBookCountsRequest()); // Fetch book category counts
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Add unrented_quantity to each category
  const dataWithUnrentedQuantity = bookCategoryCounts.map((category) => ({
    ...category,
    unrented_quantity: category.count - category.rent_quantity, // Calculate unrented quantity
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={dataWithUnrentedQuantity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />

        {/* Bar for total quantity */}
        <Bar dataKey="count" fill="#8884d8" barSize={30} name="Total Quantity" />

        {/* Bar for unrented quantity */}
        <Bar dataKey="unrented_quantity" fill="#ffc658" barSize={30} name="Unrented Quantity" />
        
        {/* Bar for rented quantity */}
        <Bar dataKey="rent_quantity" fill="#82ca9d" barSize={30} name="Rented Quantity" />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};
