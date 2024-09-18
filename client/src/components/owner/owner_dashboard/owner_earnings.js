// components/OwnerEarnings.js
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEarningsRequest } from '../../../services/actions/statisticsActions';

export const OwnerEarnings = () => {
  const dispatch = useDispatch();
  const { earnings, loading, error } = useSelector(state => state.statistics);

  useEffect(() => {
    dispatch(fetchEarningsRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={earnings} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="total_earnings" stroke="#FF8042" name="Total earnings" />
        <Line type="monotone" dataKey="fiction_earnings" stroke="#8884d8" name="Fiction earnings" />
        <Line type="monotone" dataKey="business_earnings" stroke="#82ca9d" name="Business earnings" />
        <Line type="monotone" dataKey="self_help_earnings" stroke="#FFBB28" name="Self-Help earnings" />
      </LineChart>
    </ResponsiveContainer>
  );
};
