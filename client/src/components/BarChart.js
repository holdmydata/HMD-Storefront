import React, { useEffect, useRef } from 'react';
import {Chart } from 'chart.js/auto';

const BarChart= ({ labels, data, backgroundColor, borderColor, label }) => {
  const chartRef = useRef(null);
  // Chart.register(CategoryScale);
  // Chart.register(LinearScale);


  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Visits',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
      return () => chart.destroy();
    }
  }, [data, labels]);



  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;