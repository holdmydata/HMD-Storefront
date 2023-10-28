import React, {useEffect, useRef} from 'react';
import {Chart} from 'chart.js/auto';
import { ThemeContext } from './ThemeProvider';

const BarChart = ({
    labels,
    data,
    backgroundColor,
    borderColor,
    label
}) => {
    const chartRef = useRef(null);
    // Chart.register(CategoryScale);
    // Chart.register(LinearScale);
    const plugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || 'black';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };


    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Visits',
                            data: data,
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(255, 255, 255, 1)',
                            borderWidth: 2
                        }
                    ]
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
                    },
                    plugins: {
                      fillStyle:'transparent',
                      customCanvasBackgroundColor: {
                        color: 'transparent'
                      }
                    }
                },
                plugins: [plugin]
            });
            return() => chart.destroy();
        }
    }, [data, labels]);


    return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
