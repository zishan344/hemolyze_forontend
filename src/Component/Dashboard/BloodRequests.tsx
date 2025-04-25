import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import FilterTab from "./DonationHistory/FilterTab";
import StatisticsCards from "./DonationHistory/StatisticsCards";
import BloodRequestForm from "./BloodRequestForm";
import { DonationStatus } from "../../globalType/GlobalTypes";
import { RequestRecord } from "./BloodRequest/BloodRequestType";
import BloodRequestList from "./BloodRequest/BloodRequestList";

// Reusing types from DonationHistory
const BloodRequests = () => {
  const [requestHistory, setRequestHistory] = useState<RequestRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | DonationStatus>(
    "all"
  );
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call:
      // const requestsResponse = await authApiClient.get("/request-history/");

      // For demo purposes, we'll use sample data
      setTimeout(() => {
        const sampleRequestHistory: RequestRecord[] = [
          {
            id: 1,
            requester_name: "Thomas Lee",
            blood_group: "B-",
            hospital_name: "Northside Medical Center",
            hospital_address: "789 Health Parkway",
            request_date: "2025-04-22T09:15:00",
            needed_by_date: "2025-04-27T09:15:00",
            status: "pending",
            units_needed: 2,
            notes: "Scheduled surgery",
            contact_number: "+1-555-123-4567",
          },
          {
            id: 2,
            requester_name: "Sophia Garcia",
            blood_group: "AB+",
            hospital_name: "Eastside Hospital",
            hospital_address: "321 Care Street",
            request_date: "2025-04-18T11:30:00",
            needed_by_date: "2025-04-20T11:30:00",
            status: "completed",
            units_needed: 1,
            contact_number: "+1-555-987-6543",
          },
          {
            id: 3,
            requester_name: "William Davis",
            blood_group: "O-",
            hospital_name: "Community Hospital",
            hospital_address: "567 Medical Drive",
            request_date: "2025-04-10T13:45:00",
            needed_by_date: "2025-04-12T13:45:00",
            status: "cancelled",
            units_needed: 3,
            notes: "Patient transferred to another facility",
            contact_number: "+1-555-246-8135",
          },
        ];

        setRequestHistory(sampleRequestHistory);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load blood request data. Please try again.");
      setLoading(false);
    }
  };

  /* const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365)
      return `${Math.floor(diffInDays / 30)} month${
        Math.floor(diffInDays / 30) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(diffInDays / 365)} year${
      Math.floor(diffInDays / 365) > 1 ? "s" : ""
    } ago`;
  }; */

  // Get filtered data based on active filter
  const filteredRequests =
    activeFilter === "all"
      ? requestHistory
      : requestHistory.filter((item) => item.status === activeFilter);

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
          <BloodRequestForm />
        </div>
      )}

      {/* Filter tabs */}
      <FilterTab
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        viewType="requests"
      />

      {/* Statistics Cards */}
      {!loading && !error && (
        <StatisticsCards requestHistory={requestHistory} viewType="requests" />
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-bold mb-2">No requests found</h3>
          <p className="text-base-content/70">
            {activeFilter === "all"
              ? "You don't have any blood request records yet."
              : `You don't have any ${activeFilter} blood requests.`}
          </p>
        </div>
      ) : (
        <BloodRequestList filteredRequests={filteredRequests} />
      )}
    </div>
  );
};

export default BloodRequests;
