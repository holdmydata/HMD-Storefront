import React from "react";
import CustomerResults from "../components/CustomerResults"
import {gql, useQuery} from "@apollo/client";
import CheckInForm from "../components/CheckInForm";


const GET_CUSTOMERS_QUERY = gql`
query CustomersCheckedInToday($startOfDay: DateTime!, $endOfDay: DateTime!) {
  customers(where: { visits_SOME: { date_GTE: $startOfDay, date_LTE: $endOfDay } }) {
    id
    firstName
    lastName
    phoneNumber
    visits(where: { date_GTE: $startOfDay, date_LTE: $endOfDay }) {
      date
    }
    loyaltyCoins
  }
}`;

function Dashboard() {

  const TODAY = new Date().toISOString().split('T')[0];
  const START_OF_DAY = `${TODAY}T00:00:00Z`;
  const END_OF_DAY = `${TODAY}T23:59:59Z`;
  
  const { loading, error, data } = useQuery(GET_CUSTOMERS_QUERY, {
      variables: {
          startOfDay: START_OF_DAY,
          endOfDay: END_OF_DAY
      },
      fetchPolicy: "no-cache"
  });

    if (loading) 
        return <p>Loading...</p>;
    if (error) 
        return <p>Error: {
            error.message
        }</p>;
   
    return (
      <>
      <div className={`relative md:ml-64 `}>
        <div className="flex flex-col z-auto">
            {/* <div className="w-1/2 p-4">
                <h2>Welcome Quad</h2>
            </div> */}
            <div className="w-1/2 p-4">
                <CheckInForm/>
            </div>
            <div className="p-4">
                <CustomerResults customers={
                    data ? data.customers : []
                }/>
            </div>
            {/* <div className="w-1/2 p-4">
                <h2>Misc?</h2>
            </div> */}
        </div>
      </div>
      </>
    );
};

export default Dashboard;
