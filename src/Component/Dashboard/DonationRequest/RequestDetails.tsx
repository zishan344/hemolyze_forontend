import {
  Calendar,
  Clock,
  Droplet,
  Info,
  MapPin,
  Phone,
  AlertTriangle,
} from "lucide-react";
import { formatDate, getUrgencyBadgeClass } from "../../../utils/donationUtils";

interface RequestDetailsProps {
  request: {
    id: number;
    name: string;
    blood_group: string;
    hospital_name: string;
    hospital_address: string;
    phone: string;
    required_units: number;
    fulfilled_units: number;
    urgency_level: "normal" | "urgent" | "critical";
    date: string;
    created_at: string;
    status: string;
    description?: string;
  };
  handleAcceptRequest: (requestId: number, units: number) => Promise<void>;
  loading: boolean;
}

const RequestDetails = ({
  request,
  handleAcceptRequest,
  loading,
}: RequestDetailsProps) => {
  // Calculate days remaining (if needed-by date is in the future)
  const getDaysRemaining = () => {
    const today = new Date();
    const neededByDate = new Date(request.date);
    const diffTime = neededByDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`;
  };

  // Calculate progress of fulfilled units
  const calculateProgress = () => {
    if (request.required_units <= 0) return 0;
    return Math.min(
      100,
      Math.round((request.fulfilled_units / request.required_units) * 100)
    );
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="flex-grow p-6 border-b lg:border-b-0 lg:border-r border-base-200">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="card-title text-lg">
          {request.name}
          <span className={getUrgencyBadgeClass(request.urgency_level)}>
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
            <MapPin size={16} className="mr-2 text-gray-400 mt-1" />
            <div>
              <div className="font-medium">{request.hospital_name}</div>
              <div className="text-base-content/70">
                {request.hospital_address}
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm mb-3">
            <Phone size={16} className="mr-2 text-gray-400" />
            <span>{request.phone}</span>
          </div>

          <div className="flex items-start text-sm mb-3">
            <AlertTriangle
              size={16}
              className={`mr-2 ${
                request.urgency_level === "critical"
                  ? "text-error"
                  : request.urgency_level === "urgent"
                  ? "text-warning"
                  : "text-gray-400"
              }`}
            />
            <div>
              <div className="text-sm text-base-content/70">Urgency Level</div>
              <div
                className={`font-medium ${
                  request.urgency_level === "critical"
                    ? "text-error"
                    : request.urgency_level === "urgent"
                    ? "text-warning"
                    : ""
                }`}>
                {request.urgency_level.charAt(0).toUpperCase() +
                  request.urgency_level.slice(1)}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start text-sm mb-3">
            <Calendar size={16} className="mr-2 text-gray-400 mt-1" />
            <div>
              <div className="text-sm text-base-content/70">Needed By</div>
              <div className="font-medium">{formatDate(request.date)}</div>
              <div className="text-xs text-base-content/60">
                Created: {formatDate(request.created_at)}
              </div>
            </div>
          </div>

          <div className="flex items-start text-sm mb-3">
            <Clock size={16} className="mr-2 text-gray-400 mt-1" />
            <div>
              <div className="text-sm text-base-content/70">Time Remaining</div>
              <div
                className={`font-medium ${
                  request.urgency_level === "critical"
                    ? "text-error"
                    : request.urgency_level === "urgent"
                    ? "text-warning"
                    : ""
                }`}>
                {getDaysRemaining()}
              </div>
            </div>
          </div>

          <div className="flex items-start text-sm mb-3">
            <Droplet size={16} className="mr-2 text-gray-400 mt-1" />
            <div>
              <div className="text-sm text-base-content/70">Units</div>
              <div className="font-medium">
                {request.required_units} unit
                {request.required_units !== 1 ? "s" : ""} needed
                {request.fulfilled_units > 0 && (
                  <span className="text-base-content/60 ml-1">
                    ({request.fulfilled_units} fulfilled)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Fulfillment progress</span>
          <span>{progressPercentage}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              progressPercentage === 100
                ? "bg-success"
                : request.status === "cancelled"
                ? "bg-error"
                : "bg-primary"
            }`}
            style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {request.description && (
        <div className="mt-4 bg-base-200 rounded-md p-3 text-sm">
          <div className="flex items-start">
            <Info size={16} className="mr-2 text-gray-400 mt-1" />
            <div>
              <p className="font-medium">Additional Information:</p>
              <p className="text-base-content/70">{request.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Request Status Badge */}
      <div className="mt-4 flex items-center mb-3 gap-2 justify-end">
        <div className="">
          <div
            className={`badge ${
              request.status === "completed"
                ? "badge-success"
                : request.status === "cancelled"
                ? "badge-error"
                : request.status === "accepted"
                ? "badge-info"
                : "badge-warning"
            }`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </div>
        </div>
        {request.status === "pending" && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              handleAcceptRequest(request?.id, request?.required_units)
            }
            disabled={loading}>
            {loading ? (
              <>
                <span className=""></span>
                Processing...
              </>
            ) : (
              "Accept Request"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestDetails;
