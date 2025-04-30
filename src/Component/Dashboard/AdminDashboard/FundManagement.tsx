import useFundDonationHistory from "../../../Hooks/useFundDonationHistory";
import Loadings from "../../../Shared/Loadings";

import ErrorAlert from "../../ErrorAlert";

const FundManagement = () => {
  const { donations: funds, loading, error } = useFundDonationHistory();
  if (loading) {
    return <Loadings />;
  }

  if (funds.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg font-semibold">No donation records found.</p>
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Fund Donations</h2>
      </div>
      <div className="stats shadow mb-6 w-full">
        <div className="stat">
          <div className="stat-title">Total Donations</div>
          <div className="stat-value">{funds.length}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Amount</div>
          <div className="stat-value text-success">
            $
            {funds.reduce((sum, fund) => sum + fund.amount, 0).toLocaleString()}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Avg. Donation</div>
          <div className="stat-value text-info">
            $
            {funds.length > 0
              ? (
                  funds.reduce((sum, fund) => sum + fund.amount, 0) /
                  funds.length
                ).toFixed(2)
              : "0.00"}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Donor</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={fund.id}>
                <td>{index + 1}</td>
                <td>{fund.username}</td>
                <td>${fund.amount.toLocaleString()}</td>
                <td>{new Date(fund.created_date).toLocaleDateString()}</td>
                <td>{fund.transaction_id}</td>

                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-info">View</button>
                    <button className="btn btn-xs btn-success">Receipt</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundManagement;
