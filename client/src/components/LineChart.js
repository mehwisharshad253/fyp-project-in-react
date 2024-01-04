import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First dataSet',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45]
    }
  ]
};

const LineChart = () => {
  return (
    <div className='bg-white border border-secondary'>
      <Line data={data} />
    </div>
  );
};

export default LineChart;