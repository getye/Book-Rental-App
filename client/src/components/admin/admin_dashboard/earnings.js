import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; // Customize colors as needed

export const Earnings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get('http://localhost:8001/admin/dashboard/earnings');
        const formattedData = response.data.map(item => ({
          name: item.catagory,
          value: parseFloat(item.total_earnings) 
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    };

    fetchEarnings();
  }, []);

  // Label formatter function
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const radius = outerRadius - (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
      >
        {value.toFixed(2)} ETB
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomLabel} // Use custom label function
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};


