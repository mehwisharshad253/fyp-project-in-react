import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Chart.css';

const Chart = ({ title, dataKey, grid }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getgraphdata');
        if (response.ok) {
          const data = await response.json();
          setData(data.data);
        } else {
          throw new Error('Failed to fetch graph data');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGraphData();
  }, []);

  return (
    <div className='chart'>
      <div className="chartTitle">{title}</div>
      <ResponsiveContainer width="100%" aspect={4/1}>
        <LineChart data={data}>
          {grid && <CartesianGrid stroke="#ccc" strokeDasharray='5 5' />}
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
        </LineChart>
      </ResponsiveContainer>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Chart;
