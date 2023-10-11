import React from 'react';
import BarChart from './BarChart';

function FrontpageChart() {
    // Fetch and format your data here
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = [12, 19, 3, 5, 2, 3, 7]; 
    const backgroundColor = 'rgba(75, 192, 192, 0.2)';
    const borderColor = 'rgba(75, 192, 192, 1)';
    const label = 'Check-ins Last 7 Days';

    return (
        <div>
            <BarChart
                labels={labels} 
                data={data} 
                backgroundColor={backgroundColor} 
                borderColor={borderColor} 
                label={label} 
            />
        </div>
    );
};

export default FrontpageChart;