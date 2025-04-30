import { useEffect } from "react";
import useDonationHistory from "../../../Hooks/useDonationHistory";

import Loadings from "../../../Shared/Loadings";
import ErrorAlert from "../../ErrorAlert";

const DonationManagement = () => {
  const {
    fetchAllDonationData,
    AllDonations: donations,
    loading,
    error,
  } = useDonationHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllDonationData();
        // await fetchAllUsers();
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loadings />;
  }

  if (donations.length === 0) {
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
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Donation Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Donor</th>
              <th>Recipient</th>
              <th>Blood Group</th>
              <th>Units</th>
              <th>Donation Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation.id}>
                <td>{index + 1}</td>
                <td>{donation.donor_name}</td>
                <td>{donation.recipient_name || "N/A"}</td>
                <td>{donation.blood_group}</td>
                <td>{donation.units_donated || 1}</td>
                <td>{new Date(donation.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      donation.donation_status === "donated"
                        ? "badge-success"
                        : donation.donation_status === "pending"
                        ? "badge-warning"
                        : "badge-info"
                    }`}>
                    {donation.donation_status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-info">View</button>
                    <button className="btn btn-xs">Verify</button>
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

export default DonationManagement;
