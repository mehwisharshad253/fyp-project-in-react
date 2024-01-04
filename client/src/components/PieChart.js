import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const label = ['January', 'February', 'March', 'April', 'May', 'June'];

const data = {
  labels: label,
  datasets: [
    {
      label: 'My First dataSet',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45]
    }
  ]
};

const PieChart = () => {
  return (
    <div className='bg-white border border-secondary'>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;