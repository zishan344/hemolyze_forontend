import { useEffect } from "react";
import {
  AcceptedRequestItem,
  RequestStatus,
} from "../../../types/Dashboard/DonationRequests.types";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

interface RequestAcceptProps {
  status: RequestStatus;
  loading: boolean;
  requestId: number;
  fetchAcceptedDonationRequest: (requestId: number) => Promise<void>;
  acceptedRequest?: AcceptedRequestItem;
  handleAcceptRequest: (requestId: number) => Promise<void>;
  handleUpdateStatus: (
    acceptedRequestId: number,
    status: string
  ) => Promise<void>;
  /*  requestAcceptedId?: number;
  onAcceptRequest: (requestId: number) => Promise<void>;
  onUpdateDonationStatus?: (status: DonationStatus) => Promise<void>; */
}

const RequestAccept = ({
  fetchAcceptedDonationRequest,
  handleAcceptRequest,
  handleUpdateStatus,
  requestId,
  acceptedRequest,
  status,
  loading,
}: RequestAcceptProps) => {
  useEffect(() => {
    const fetchAcceptedRequest = async () => {
      try {
        await fetchAcceptedDonationRequest(requestId);
      } catch (error) {
        console.error("Error fetching accepted request:", error);
      }
    };
    fetchAcceptedRequest();
  }, []);

  // Handle different donation statuses for accepted requests
  const renderDonationActions = () => {
    if (!acceptedRequest) return null;

    /* switch (acceptedRequest.donation_status) {
      case "pending":
        return (
          <div className="space-y-2 mt-4">
            <p className="text-sm text-center mb-2">Update Donation Status</p>
            <button
              className="btn btn-error btn-sm w-full flex items-center gap-2"
              onClick={() =>
                handleUpdateStatus(acceptedRequest?.id, "canceled")
              }
              disabled={loading}>
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Processing...
                </>
              ) : (
                <>
                  <XCircle size={16} />
                  Cancel Donation
                </>
              )}
            </button>
          </div>
        );

      case "donated":
        return (
          <div className="space-y-2 mt-4">
            <div className="alert alert-success p-2 text-xs">
              <CheckCircle size={16} />
              <span>You've donated blood for this request. Thank you!</span>
            </div>
          </div>
        );

      case "canceled":
        return (
          <div className="space-y-2 mt-4">
            <div className="alert alert-error p-2 text-xs">
              <AlertTriangle size={16} />
              <span>You've canceled your donation for this request</span>
            </div>
            {status === "pending" && (
              <button
                className="btn btn-outline btn-primary btn-sm w-full"
                onClick={() => handleAcceptRequest(requestId)}
                disabled={loading}>
                Accept Request Again
              </button>
            )}
          </div>
        );
      default:
        return null;
    } */
  };

  return (
    <div className="w-full lg:w-64 p-6 flex flex-col justify-between">
      {/* Request Status */}
      <div className="text-center mb-4">
        <p className="text-sm mb-2">Request Status</p>
        <div
          className={`badge badge-lg ${
            status === "accepted"
              ? "badge-info"
              : status === "completed"
              ? "badge-success"
              : status === "cancelled"
              ? "badge-error"
              : "badge-warning"
          }`}>
          {status.toUpperCase()}
        </div>
      </div>

      {/* User's donation status if they've accepted this request */}
      {acceptedRequest && (
        <div className="text-center mb-4">
          <p className="text-sm mb-2">Your Donation Status</p>
          <div
            className={`badge badge-lg ${
              acceptedRequest?.donation_status === "donated"
                ? "badge-success"
                : acceptedRequest?.donation_status === "canceled"
                ? "badge-error"
                : "badge-info"
            }`}>
            {acceptedRequest.donation_status?.toUpperCase()}
          </div>
        </div>
      )}

      {/* Show different actions based on request status and acceptance status */}
      {status === "pending" && !acceptedRequest && (
        <button
          className="btn btn-primary w-full"
          onClick={() => handleAcceptRequest(requestId)}
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
      )}

      {/* If the request is completed or cancelled and not accepted by this user */}
      {(status === "completed" || status === "cancelled") &&
        !acceptedRequest && (
          <div className="space-y-2">
            <div
              className={`alert ${
                status === "completed" ? "alert-success" : "alert-error"
              } p-2 text-xs`}>
              <span>
                {status === "completed"
                  ? "This request has been fulfilled"
                  : "This request has been cancelled"}
              </span>
            </div>
          </div>
        )}

      {/* Render donation actions if the user has accepted this request */}
      {/* {renderDonationActions()} */}

      {/* Contact button for accepted requests */}
      {acceptedRequest && acceptedRequest.donation_status === "pending" && (
        <button className="btn btn-outline btn-sm w-full mt-2">
          Contact Recipient
        </button>
      )}

      {/* Accepted by another donor notification */}
      {status === "accepted" && !acceptedRequest && (
        <div className="alert alert-info p-2 text-xs">
          <Clock size={16} />
          <span>This request has been accepted by another donor</span>
        </div>
      )}
    </div>
  );
};

export default RequestAccept;
