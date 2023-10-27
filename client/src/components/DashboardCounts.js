import React, {useEffect} from "react";
import { formatISO } from 'date-fns';
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_COUNTS_QUERY } from "../queries/queryDashboardCounts";


function DashboardCounts({refetchTrigger})  {

    const TODAY_START = new Date();
    TODAY_START.setHours(0, 0, 0, 0);
    const TODAY_END = new Date();
    TODAY_END.setHours(23, 59, 59, 999);
    const START_OF_DAY = formatISO(TODAY_START, { representation: 'date' }) + 'T00:00:00';
    const END_OF_DAY = formatISO(TODAY_END, { representation: 'date' }) + 'T23:59:59';
    
    const { loading, error, data, refetch } = useQuery(GET_DASHBOARD_COUNTS_QUERY, {
        variables: {
            startOfDay: START_OF_DAY,
            endOfDay: END_OF_DAY
        },
        fetchPolicy: "network-only"
    });
    useEffect(() => {
        refetch();
      }, [refetchTrigger, refetch]);
    
      if (loading) 
          return <p>Loading...</p>;
      if (error) 
          return <p>Error: {
              error.message
          }</p>;
        if (!data) return <p>Not found</p>;
        
    return (
        <>
        <div className="container max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <div className="grid grid-flow-col overflow-hidden sm:grid-cols-2 lg:grid-cols-2">
            <div className=" sm:text-left text-left py-2 px-2 space-y-1">
            <p className=" text-xs text-stone-100 justify-center font-stock uppercase font-extrabold sm:text-sm text-center ">Customers Today</p>                             
                <div className="px-2 py-2 max-w-sm bg-stone-100 rounded-lg shadow-md">
                    <div className="space-y-0.5">

                    <p className="text-stone-600 font-medium text-2xl justify-center flex flex-auto">{data.dashboardCounts[0]?.customerCount ? data.dashboardCounts[0].customerCount : 0}</p>
                    </div>
                </div>
            </div>
            <div className=" sm:text-left text-left py-2 px-2 space-y-1">
            <p className=" text-xs text-stone-100 justify-center font-stock uppercase font-extrabold sm:text-sm text-center ">Rewards Today</p>           
            <div className="px-2 py-2 max-w-sm bg-stone-100 rounded-lg shadow-md">
                    <div className="space-y-0.5">
                    <p className="text-stone-600 font-medium text-2xl justify-center flex flex-auto">{data.dashboardCounts[0].rewardCount ? data.dashboardCounts[0].rewardCount : 0}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default DashboardCounts;