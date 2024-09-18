import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountsRequest } from '../../../services/actions/statisticsActions';

export const Statistics = () => {
  const dispatch = useDispatch();
  const { counts, loading, error } = useSelector(state => state.statistics);

  useEffect(() => {
    dispatch(fetchCountsRequest());
  }, [dispatch]);

  const data = [
    { name: 'Owners', count: Number(counts.ownersCount) },
    { name: 'Admins', count: Number(counts.adminsCount) },
    { name: 'Renters', count: Number(counts.rentersCount) },
    { name: 'Books', count: Number(counts.booksCount) }
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        
        <Bar dataKey="count" fill="#8884d8" barSize={40}/>
      </BarChart>
    </ResponsiveContainer>
  );
};
