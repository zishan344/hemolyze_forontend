import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import FilterTab from "./DonationHistory/FilterTab";
import BloodRequestForm from "./BloodRequestForm";
import BloodRequestList from "./BloodRequest/BloodRequestList";
import { RequestRecord } from "./BloodRequest/BloodRequestType";
import authApiClient from "../../Service/authApiClient";
import ErrorAlert from "../ErrorAlert";
import useBloodDataContext from "../../Hooks/useBloodDataContext";
import Loading from "../../Shared/Loadings";

const BloodRequests = () => {
  const {
    handleUpdateAcceptedBloodRequest: handleUpdateAcceptedBloodRequested,
    loading: updateLoading,
  } = useBloodDataContext();
  const [requestHistory, setRequestHistory] = useState<RequestRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    | "all"
    | "pending"
    | "accepted"
    | "completed"
    | "cancelled"
    | "donated"
    | "canceled"
  >("all");
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the API endpoint to get user's blood requests
      const response = await authApiClient.get("/blood-request/my-requests/");
      setRequestHistory(response.data);
    } catch (err: unknown|any) {
      console.error("Error fetching blood requests:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load blood request data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle request form submission success
  const handleRequestSubmitted = () => {
    // Refresh the requests list
    fetchData();
    // Hide the form
    setShowRequestForm(false);
  };

  // Handle request cancellation
  const handleCancelBloodPostRequest = async (requestId: number) => {
    setLoading(true);
    setError(null);
    try {
      await authApiClient.patch(`/blood-request/${requestId}/`, {
        status: "cancelled",
      });

      // Update local state to reflect the change
      setRequestHistory((prevHistory) =>
        prevHistory.map((req) =>
          req.id === requestId ? { ...req, status: "cancelled" as const } : req
        )
      );
    } catch (err: unknown | any) {
      console.error("Error canceling request:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to cancel request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
  /* const cancelledCount = requestHistory.filter(
    (req) => req.status === "cancelled"
  ).length; */
  const totalCount = requestHistory.length;

  // Calculate total units requested and fulfilled
  /* const totalUnitsRequested = requestHistory.reduce(
    (total, req) => total + req.required_units,
    0
  );
  const totalUnitsFulfilled = requestHistory.reduce(
    (total, req) => total + req.fulfilled_units,
    0
  ); */

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

      {error && <ErrorAlert message={error} />}

      {/* Create Request Button */}
      <div className="flex justify-end mb-6">
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setShowRequestForm(!showRequestForm)}>
          <PlusCircle size={18} />
          {showRequestForm ? "Hide Request Form" : "Create New Request"}
        </button>
      </div>

      {/* Show Blood Request Form when button is clicked */}
      {showRequestForm && (
        <div className="mb-8">
          <BloodRequestForm onRequestSubmitted={handleRequestSubmitted} />
        </div>
      )}

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
              onClick={() => setShowRequestForm(true)}>
              Create Your First Request
            </button>
          )}
        </div>
      ) : (
        <div>
          <BloodRequestList
            loading={loading}
            updateLoading={updateLoading}
            handleCancelBloodPostRequest={handleCancelBloodPostRequest}
            filteredRequests={filteredRequests}
            handleUpdateAcceptedBloodRequest={handleUpdateAcceptedBloodRequest}
          />
        </div>
      )}
    </div>
  );
};

export default BloodRequests;
