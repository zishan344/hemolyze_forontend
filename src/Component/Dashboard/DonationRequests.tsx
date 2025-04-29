import { useEffect } from "react";

import DonationRequestsList from "./DonationRequest/DonationRequestsList";

import useBloodDataContext from "../../Hooks/useBloodDataContext";

const DonationRequests = () => {
  const {
    fetchDonationRequests,
    bloodDonationAccepted,
    bloodDonationRequests,
    loading,
    error,
    successMessage,
  } = useBloodDataContext();
  useEffect(() => {
    const fetchRequests = async () => {
      await fetchDonationRequests();
    };
    fetchRequests();
  }, []);
  // Filter requests based on the selected filter
  const filteredRequests = bloodDonationRequests
    ? bloodDonationRequests.filter((req) => {
        // Filter for pending requests
        const isPending = req.status === "pending";

        // Filter out requests that have already been accepted
        const isNotAccepted = bloodDonationAccepted
          ? !bloodDonationAccepted.some(
              (donation) => donation.request_user === req.id
            )
          : true;

        return isPending && isNotAccepted;
      })
    : [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-content mb-2">
          Blood Donation Requests
        </h1>
        <p className="text-base-content/70">
          View all blood donation requests from recipients in need. Accept a
          request to help save a life.
        </p>
      </div>

      {/* Success message */}
      {/* {successMessage && <SuccessAlert message={successMessage} />} */}

      {/* Error message */}

      {/* Filter tabs */}

      {/* Requests List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">No donation requests found</h3>
          <p className="text-base-content/70">
            There are currently no donation requests
          </p>
        </div>
      ) : (
        <DonationRequestsList
          filteredRequests={filteredRequests}
          loading={loading}
          error={error}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};

export default DonationRequests;
