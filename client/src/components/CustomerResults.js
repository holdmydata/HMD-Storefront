import { useQuery, gql } from '@apollo/client';
import { formatISO } from 'date-fns';
import '../App.css';
import React, {useEffect} from 'react';


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

function CustomerResults({refetchTrigger}) {
  const TODAY_START = new Date();
  TODAY_START.setHours(0, 0, 0, 0);
  const TODAY_END = new Date();
  TODAY_END.setHours(23, 59, 59, 999);
  const START_OF_DAY = formatISO(TODAY_START, { representation: 'date' }) + 'T00:00:00';
  const END_OF_DAY = formatISO(TODAY_END, { representation: 'date' }) + 'T23:59:59';
  

  
  const { loading, error, data, refetch} = useQuery(GET_CUSTOMERS_QUERY, {
      variables: {
          startOfDay: START_OF_DAY,
          endOfDay: END_OF_DAY
      },
      fetchPolicy: "network-only"
  });
  // console.log('Query response:', {data, error});
  useEffect(() => {
    refetch();
  }, [refetchTrigger, refetch]);

  if (loading) 
      return <p>Loading...</p>;
  if (error) 
      return <p>Error: {
          error.message
      }</p>;

  const customers = data.customers;
  

  return (
    <div className="p-4 w-auto  shadow-lg border border-white rounded-md bg-stone-800">
      <table className="table-fixed text-sm w-full border border-gray-300 divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="p-2 text-center text-neutral-200">Name</th>
            <th className="p-2 text-center  text-neutral-200 ">Phone</th>
            <th className="p-2 text-center  text-neutral-200">Check-in Times</th>
            <th className="p-2 text-center  text-neutral-200">Loyalty Coins</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((b, i) => (
            <tr key={i} className={`${i % 2 === 0 ? 'bg-neutral-50 text-neutral-600' : 'bg-stone-700 text-neutral-50'} hover:bg-neutral-100 hover:text-stone-600`}>
              <td className="p-2 font-thin text-center">{b.firstName} {b.lastName}</td>
              <td className="p-2 font-thin text-center">{b.phoneNumber}</td>
              <td className="p-2 font-thin text-center">{b.visits.map((visit, j) => (
                  <div key={j}>
                    {new Date(visit.date).toLocaleTimeString()} {/* Convert the datetime to a readable time format */}
                  </div>
                ))}
              </td>
              <td className="p-2 text-center">{b.loyaltyCoins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CustomerResults;