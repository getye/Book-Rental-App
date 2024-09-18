// components/OwnerEarnings.js
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentFeeRequest } from '../../../services/actions/statisticsActions';

export const RenterFees = () => {
  const dispatch = useDispatch();
  const { fees, loading, error } = useSelector(state => state.statistics);
  console.log("Fees:", fees)
  useEffect(() => {
    dispatch(fetchRentFeeRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={fees} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="total_fee" stroke="#FF8042" name="Total fee" />
        <Line type="monotone" dataKey="fiction_fee" stroke="#8884d8" name="Fiction fee" />
        <Line type="monotone" dataKey="business_fee" stroke="#82ca9d" name="Business fee" />
        <Line type="monotone" dataKey="self_help_fee" stroke="#FFBB28" name="Self-Help fee" />
      </LineChart>
    </ResponsiveContainer>
  );
};
