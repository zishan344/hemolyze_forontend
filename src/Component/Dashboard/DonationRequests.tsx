import {
  AlertCircle,
  Calendar,
  Clock,
  Droplet,
  MapPin,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import apiClient from "../../Service/apiClient";

// Define request types
type RequestStatus = "pending" | "accepted" | "completed" | "cancelled";

interface RecipientRequest {
  id: number;
  name: string;
  blood_group: string;
  hospital_name: string;
  hospital_address: string;
  phone: string;
  required_units: number;
  urgency_level: "normal" | "urgent" | "critical";
  date: string;
  status?: RequestStatus;
  description?: string;
}

const DonationRequests = () => {
  // const { user } = useAuthContext();
  const [requests, setRequests] = useState<RecipientRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      // This would normally call your API endpoint
      const response = await apiClient.get("/blood-request");
      setRequests(response.data);
      setLoading(false);

      // For demo purposes, using static data
      /* setTimeout(() => {
        const sampleRequests: RecipientRequest[] = [
          {
            id: 1,
            recipient_name: "Sarah Johnson",
            blood_group: "A+",
            hospital_name: "City General Hospital",
            hospital_address: "123 Medical Center Blvd",
            contact_number: "555-123-4567",
            required_units: 2,
            urgency_level: "urgent",
            request_date: "2025-04-22T08:30:00",
            status: "pending",
            additional_info: "Patient scheduled for surgery tomorrow morning",
          },
          {
            id: 2,
            recipient_name: "Michael Chen",
            blood_group: "O-",
            hospital_name: "Memorial Hospital",
            hospital_address: "456 Healthcare Ave",
            contact_number: "555-987-6543",
            required_units: 3,
            urgency_level: "critical",
            request_date: "2025-04-23T14:15:00",
            status: "pending",
            additional_info: "Emergency transfusion needed for accident victim",
          },
          {
            id: 3,
            recipient_name: "Lisa Rodriguez",
            blood_group: "B+",
            hospital_name: "Westside Medical Center",
            hospital_address: "789 Treatment Lane",
            contact_number: "555-456-7890",
            required_units: 1,
            urgency_level: "normal",
            request_date: "2025-04-25T10:00:00",
            status: "pending",
          },
          {
            id: 4,
            recipient_name: "David Williams",
            blood_group: "AB-",
            hospital_name: "Eastside Hospital",
            hospital_address: "321 Care Street",
            contact_number: "555-789-0123",
            required_units: 2,
            urgency_level: "urgent",
            request_date: "2025-04-24T16:45:00",
            status: "pending",
            additional_info: "Rare blood type needed for scheduled procedure",
          },
        ];
        setRequests(sampleRequests);
        setLoading(false);
      }, 1000); */
    } catch (error) {
      console.error("Error fetching donation requests:", error);
      setError("Failed to load donation requests. Please try again.");
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId: number) => {
    try {
      setLoading(true);

      // In a real app, you would make an API call:
      // await authApiClient.post(`/donation-requests/${requestId}/accept/`);

      // For demo purposes:
      setTimeout(() => {
        // Update the local state to reflect the accepted request
        const updatedRequests = requests.map((req) =>
          req.id === requestId
            ? { ...req, status: "accepted" as RequestStatus }
            : req
        );
        setRequests(updatedRequests);

        setSuccessMessage(
          "Request accepted successfully! The recipient has been notified."
        );
        setTimeout(() => setSuccessMessage(null), 5000); // Clear message after 5 seconds

        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error accepting request:", error);
      setError("Failed to accept request. Please try again.");
      setLoading(false);
    }
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((req) => req.status === filter);

  const getUrgencyBadgeClass = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "badge badge-error";
      case "urgent":
        return "badge badge-warning";
      default:
        return "badge badge-info";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getDaysUntil = (dateString: string) => {
    const requestDate = new Date(dateString);
    const today = new Date();
    const diffTime = requestDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    return `In ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  };

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
      {successMessage && (
        <div className="alert alert-success mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="alert alert-error mb-6">
          <AlertCircle className="stroke-current shrink-0 h-6 w-6" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter tabs */}
      <div className="tabs tabs-boxed bg-base-200 mb-6 inline-flex">
        <button
          className={`tab ${filter === "all" ? "tab-active" : ""}`}
          onClick={() => setFilter("all")}>
          All Requests
        </button>
        <button
          className={`tab ${filter === "pending" ? "tab-active" : ""}`}
          onClick={() => setFilter("pending")}>
          Pending
        </button>
        <button
          className={`tab ${filter === "accepted" ? "tab-active" : ""}`}
          onClick={() => setFilter("accepted")}>
          Accepted
        </button>
      </div>

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
            There are currently no {filter !== "all" ? filter : ""} donation
            requests
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="card-body p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Left side - Request details */}
                  <div className="flex-grow p-6 border-b lg:border-b-0 lg:border-r border-base-200">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <h2 className="card-title text-lg">
                        {request.name}
                        <span
                          className={getUrgencyBadgeClass(
                            request.urgency_level
                          )}>
                          {request.urgency_level === "critical"
                            ? "CRITICAL"
                            : request.urgency_level === "urgent"
                            ? "Urgent"
                            : "Normal"}
                        </span>
                      </h2>
                      <div className="badge badge-lg badge-primary text-white font-bold">
                        {request.blood_group}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-start text-sm mb-3">
                          <MapPin
                            size={16}
                            className="mr-2 text-gray-400 mt-1"
                          />
                          <div>
                            <div className="font-medium">
                              {request.hospital_name}
                            </div>
                            <div className="text-base-content/70">
                              {request.hospital_address}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-sm mb-3">
                          <Phone size={16} className="mr-2 text-gray-400" />
                          <span>{request.phone}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center text-sm mb-3">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          <span>{formatDate(request.date)}</span>
                        </div>

                        <div className="flex items-center text-sm mb-3">
                          <Clock size={16} className="mr-2 text-gray-400" />
                          <span
                            className={
                              request.urgency_level === "critical"
                                ? "text-error"
                                : request.urgency_level === "urgent"
                                ? "text-warning"
                                : ""
                            }>
                            {getDaysUntil(request.date)}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Droplet size={16} className="mr-2 text-gray-400" />
                          <span>
                            {request.required_units} unit
                            {request.required_units !== 1 ? "s" : ""} needed
                          </span>
                        </div>
                      </div>
                    </div>

                    {request.description && (
                      <div className="mt-4 bg-base-200 rounded-md p-3 text-sm">
                        <p className="font-medium">Additional Information:</p>
                        <p className="text-base-content/70">
                          {request.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side - Actions */}
                  <div className="w-full lg:w-64 p-6 flex flex-col justify-between">
                    <div className="text-center mb-4">
                      <p className="text-sm mb-2">Request Status</p>
                      <div
                        className={`badge badge-lg ${
                          request.status === "accepted"
                            ? "badge-success"
                            : request.status === "completed"
                            ? "badge-info"
                            : request.status === "cancelled"
                            ? "badge-error"
                            : "badge-warning"
                        }`}>
                        {request?.status?.toUpperCase()}
                      </div>
                    </div>

                    {request?.status === "pending" ? (
                      <button
                        className="btn btn-primary w-full"
                        onClick={() => handleAcceptRequest(request.id)}
                        disabled={loading}>
                        {loading ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Processing...
                          </>
                        ) : (
                          "Accept Request"
                        )}
                      </button>
                    ) : request?.status === "accepted" ? (
                      <div className="space-y-2">
                        <div className="text-xs text-center text-success">
                          You've accepted this request
                        </div>
                        <button className="btn btn-outline btn-sm w-full">
                          Contact Recipient
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
