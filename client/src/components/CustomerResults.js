import '../App.css';

function CustomerResults(props) {
  const { customers } = props;

  return (
    <div className="p-4 shadow-lg border rounded bg-white">
      <h2 className="text-xl mb-4 text-center">Today's Customers!</h2>
      <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">Phone</th>
            <th className="p-2 text-center">Check-in Times</th>
            <th className="p-2 text-center">Loyalty Coins</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((b, i) => (
            <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100`}>
              <td className="p-2 text-center">{b.firstName} {b.lastName}</td>
              <td className="p-2 text-center">{b.phoneNumber}</td>
              <td className="p-2 text-center">
                {b.visits.map((visit, j) => (
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