import React, {useEffect} from 'react';
import BarChart from './BarChart';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

function FrontpageChart(refetchTrigger) {
    
    const GET_FRONTPAGE_CHART_DATA = gql`
    query GetFrontpageChartData {
        frontpageChartData {
            visitDate
            customerCount
            rewardCount
            visitCount
        }
      }
    `;
    
    const { loading, error, data, refetch } = useQuery(GET_FRONTPAGE_CHART_DATA);

    useEffect(() => {
        refetch();
      }, [refetchTrigger, refetch]);
    
      if (loading) 
          return <p>Loading...</p>;
      if (error) 
          return <p>Error: {
              error.message
          }</p>;


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;



    console.log("Frontpage chart data:", data);

    const labels = data && data.frontpageChartData ? data.frontpageChartData.map(item => item.visitDate) : [];
    const chartData = data && data.frontpageChartData ? data.frontpageChartData.map(item => item.visitCount) : [];

    const backgroundColor = 'transparent';
    const borderColor = 'rgba(75, 192, 192, 1)';
    const label = 'Check-ins Last 7 Days';

    return (
        <div>
            <BarChart
                labels={labels} 
                data={chartData} 
                backgroundColor={backgroundColor} 
                borderColor={borderColor} 
                label={label} 
            />
        </div>
    );
};

export default FrontpageChart;