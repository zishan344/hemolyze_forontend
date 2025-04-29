import { useState } from "react";
import { PlusCircle } from "lucide-react";
import FilterTab from "./DonationHistory/FilterTab";
import BloodRequestList from "./BloodRequest/BloodRequestList";
import { RequestRecord } from "./BloodRequest/BloodRequestType";
import useBloodDataContext from "../../Hooks/useBloodDataContext";
import Loading from "../../Shared/Loadings";
import BloodRequestModal from "./BloodRequest/BloodRequestModal";
import toast from "react-hot-toast";

const BloodRequests = () => {
  const {
    handleUpdateAcceptedBloodRequest: handleUpdateAcceptedBloodRequested,
    handleCancelBloodPostRequest,
    loading,
    updateLoading,
    error,
    requestHistory,
  } = useBloodDataContext();
  // console.log("hear are my data", requestHistory);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    | "all"
    | "pending"
    | "accepted"
    | "completed"
    | "cancelled"
    | "donated"
    | "canceled"
  >("all");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestToUpdate, setRequestToUpdate] = useState<RequestRecord | null>(
    null
  );

  // Handle request form submission success
  const handleRequestSubmitted = () => {
    // Refresh the requests list
    // fetchData();
    // Hide the form
    setShowRequestModal(false);
    // Reset the request to update
    setRequestToUpdate(null);
  };

  // Handle request cancellation
  const handleCancelRequest = async (requestId: number) => {
    try {
      await handleCancelBloodPostRequest(requestId);
    } catch (err: unknown) {
      console.error("Error canceling request:", err);
    }
  };
  // Handle updating a blood request
  const handleUpdateRequest = (request: RequestRecord) => {
    setRequestToUpdate(request);
    setShowRequestModal(true);
  };

  // Keep the existing handleUpdateAcceptedBloodRequest function unchanged
  const handleUpdateAcceptedBloodRequest = async (
    requestId: number,
    status: string
  ) => {
    try {
      await handleUpdateAcceptedBloodRequested(requestId, status);
    } catch (err: unknown) {
      console.error("Error updating accepted blood request:", err);
    }
  };

  // Get filtered data based on active filter
  const filteredRequests =
    activeFilter === "all"
      ? requestHistory
      : requestHistory.filter((item) => item.status === activeFilter);

  // Calculate statistics for the cards
  const pendingCount = requestHistory.filter(
    (req) => req.status === "pending"
  ).length;
  const completedCount = requestHistory.filter(
    (req) => req.status === "completed"
  ).length;
  const acceptedCount = requestHistory.filter(
    (req) => req.status === "accepted"
  ).length;
  const totalCount = requestHistory.length;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-content mb-2">
          Blood Donation Requests
        </h1>
        <p className="text-base-content/70">
          Manage your blood requests as a recipient and find donors who can
          help.
        </p>
      </div>

      {error && toast.error(error)}

      {/* Create Request Button */}
      <div className="flex justify-end mb-6">
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => {
            setShowRequestModal(true);
            if (!requestToUpdate) setRequestToUpdate(null);
          }}>
          <PlusCircle size={18} />
          Create New Request
        </button>
      </div>

      {/* Blood Request Modal */}
      <BloodRequestModal
        isVisible={showRequestModal}
        onClose={() => {
          setShowRequestModal(false);
          setRequestToUpdate(null);
        }}
        onRequestSubmitted={handleRequestSubmitted}
        requestToUpdate={requestToUpdate}
      />

      {/* Filter tabs */}
      <div className="mb-6">
        <FilterTab
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          viewType="requests"
        />
      </div>

      {/* Statistics Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-base-100 p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-base-content/70">
              Total Requests
            </h3>
            <p className="text-3xl font-bold">{totalCount}</p>
          </div>
          <div className="bg-base-100 p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-base-content/70">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-warning">{pendingCount}</p>
          </div>
          <div className="bg-base-100 p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-base-content/70">
              Accepted Requests
            </h3>
            <p className="text-3xl font-bold text-info">{acceptedCount}</p>
          </div>
          <div className="bg-base-100 p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-base-content/70">
              Completed Requests
            </h3>
            <p className="text-3xl font-bold text-success">{completedCount}</p>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <Loading />
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-bold mb-2">No requests found</h3>
          <p className="text-base-content/70">
            {activeFilter === "all"
              ? "You don't have any blood request records yet."
              : `You don't have any ${activeFilter} blood requests.`}
          </p>
          {activeFilter === "all" && requestHistory.length === 0 && (
            <button
              className="btn btn-primary mt-4"
              onClick={() => setShowRequestModal(true)}>
              Create Your First Request
            </button>
          )}
        </div>
      ) : (
        <div>
          <BloodRequestList
            loading={loading}
            updateLoading={updateLoading}
            handleCancelBloodPostRequest={handleCancelRequest}
            filteredRequests={filteredRequests}
            handleUpdateAcceptedBloodRequest={handleUpdateAcceptedBloodRequest}
            handleUpdateRequest={handleUpdateRequest}
          />
        </div>
      )}
    </div>
  );
};

export default BloodRequests;
