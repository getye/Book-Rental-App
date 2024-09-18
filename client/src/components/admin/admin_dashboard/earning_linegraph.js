import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export const EarningsLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get('http://localhost:8001/admin/dashboard/monthly-earnings');
        const formattedData = response.data.map(item => ({
          period: new Date(item.period).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
          fiction_earnings: parseFloat(item.fiction_earnings) || 0, // Ensure value is a number or default to 0
          business_earnings: parseFloat(item.business_earnings) || 0, // Same for business earnings
          self_help_earnings: parseFloat(item.self_help_earnings) || 0, // Same for self help earnings
          total_earnings: parseFloat(item.total_earnings) || 0 // Total earnings with fallback to 0
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    };
  
    fetchEarnings();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Total earnings line */}
        <Line type="monotone" dataKey="total_earnings" stroke="#FF8042" name="Total Earnings" />

        {/* Fiction earnings line */}
        <Line type="monotone" dataKey="fiction_earnings" stroke="#8884d8" name="Fiction Earnings" />

        {/* Business earnings line */}
        <Line type="monotone" dataKey="business_earnings" stroke="#82ca9d" name="Business Earnings" />

        {/* Self Help earnings line */}
        <Line type="monotone" dataKey="self_help_earnings" stroke="#FFBB28" name="Self-Help Earnings" />
      </LineChart>
    </ResponsiveContainer>
  );
};
