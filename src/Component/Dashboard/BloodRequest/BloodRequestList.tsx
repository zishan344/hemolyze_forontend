import { Calendar, DropletIcon, Info, MapPin, User, Phone } from "lucide-react";
import { getBadgeClass } from "../../../Global/GlobalVar";
import { RequestRecord } from "./BloodRequestType";

interface BloodRequestListProps {
  filteredRequests: RequestRecord[];
  handleCancelBloodPostRequest: (requestId: number) => Promise<void>;
  handleUpdateAcceptedBloodRequest: (
    requestId: number,
    status: string
  ) => Promise<void>;
  handleUpdateRequest?: (request: RequestRecord) => void; // Add new prop for update functionality
  loading: boolean;
  updateLoading: boolean;
}

const BloodRequestList = ({
  filteredRequests,
  handleCancelBloodPostRequest,
  loading,
  updateLoading,
  handleUpdateAcceptedBloodRequest,
  handleUpdateRequest,
}: BloodRequestListProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateProgress = (request: RequestRecord) => {
    if (request.progress_percentage !== undefined) {
      return request.progress_percentage;
    }

    if (request.required_units <= 0) {
      return 0;
    }
    return Math.min(
      100,
      Math.round((request.fulfilled_units / request.required_units) * 100)
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Blood Request List */}
      {filteredRequests.map((request) => (
        <div
          key={request.id}
          className="card bg-base-100 shadow-md overflow-hidden">
          <div className="card-body p-0">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Details */}
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title">{request.hospital_name}</h2>
                  <div className={`badge ${getBadgeClass(request.status)}`}>
                    {request.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-start text-sm mb-3">
                      <User size={16} className="mr-2 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-base-content/70">
                          Requester
                        </div>
                        <div className="font-medium">{request.name}</div>
                      </div>
                    </div>

                    <div className="flex items-start text-sm mb-3">
                      <MapPin size={16} className="mr-2 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-base-content/70">
                          Location
                        </div>
                        <div className="font-medium">
                          {request.hospital_address}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start text-sm mb-3">
                      <Phone size={16} className="mr-2 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-base-content/70">
                          Contact
                        </div>
                        <div className="font-medium">{request.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start text-sm mb-3">
                      <Calendar size={16} className="mr-2 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-base-content/70">
                          Needed By Date
                        </div>
                        <div className="font-medium">
                          {formatDate(request.date)}
                        </div>
                        <div className="text-xs text-base-content/60">
                          Created:{" "}
                          {new Date(request.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start text-sm mb-3">
                      <DropletIcon
                        size={16}
                        className="mr-2 text-gray-400 mt-1"
                      />
                      <div>
                        <div className="text-sm text-base-content/70">
                          Blood Type & Units
                        </div>
                        <div className="font-medium">
                          {request.blood_group} • {request.required_units} unit
                          {request.required_units !== 1 ? "s" : ""}
                          {request.fulfilled_units > 0 && (
                            <span className="text-sm text-base-content/60 ml-2">
                              ({request.fulfilled_units} fulfilled)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start text-sm mb-3">
                      <Info size={16} className="mr-2 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-base-content/70">
                          Urgency Level
                        </div>
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
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{calculateProgress(request)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        request.status === "completed"
                          ? "bg-success"
                          : request.status === "cancelled"
                          ? "bg-error"
                          : request.status === "accepted"
                          ? "bg-info"
                          : "bg-primary"
                      }`}
                      style={{ width: `${calculateProgress(request)}%` }}></div>
                  </div>
                </div>

                {request.description && (
                  <div className="mt-4 bg-base-200 p-3 rounded-md text-sm flex items-start">
                    <Info size={16} className="mr-2 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium">Notes</div>
                      <div className="text-base-content/70">
                        {request.description}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right side - Actions */}
              <div className="border-t lg:border-t-0 lg:border-l border-base-200 p-6 lg:w-48 flex flex-col justify-center items-center">
                <div className="text-center">
                  {request.status === "pending" && (
                    <>
                      <div className="badge badge-warning mb-3">Pending</div>
                      <p className="text-sm text-base-content/70 mb-2">
                        Awaiting donors
                      </p>
                      <button className="btn btn-outline btn-sm btn-primary w-full mb-2">
                        Share Request
                      </button>
                      <button
                        onClick={() => handleCancelBloodPostRequest(request.id)}
                        className="btn btn-outline btn-sm btn-error w-full">
                        {loading ? "cancelling..." : "Cancel Request"}
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateRequest && handleUpdateRequest(request)
                        }
                        className="btn mt-2 btn-outline btn-sm btn-info w-full">
                        Update Request
                      </button>
                    </>
                  )}

                  {request.status === "accepted" && (
                    <>
                      <div className="badge badge-info mb-3">Accepted</div>
                      <p className="text-sm text-base-content/70 mb-2">
                        Donor has accepted request
                      </p>
                      <button className="btn btn-outline btn-sm btn-primary w-full mb-2">
                        Contact Donor
                      </button>
                      <div className="flex flex-col gap-2 flex-wrap">
                        <button
                          onClick={() =>
                            handleUpdateAcceptedBloodRequest(
                              request.id,
                              "accepted_by_user"
                            )
                          }
                          className="btn btn-outline btn-sm btn-success w-full">
                          {updateLoading ? "receiving..." : "Mark as Received"}
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateAcceptedBloodRequest(
                              request.id,
                              "canceled_by_user"
                            )
                          }
                          className="btn btn-outline btn-sm btn-error w-full">
                          {updateLoading ? "cancelling..." : "Canceled"}
                        </button>
                      </div>
                    </>
                  )}

                  {request.status === "completed" && (
                    <>
                      <div className="badge badge-success mb-3">Completed</div>
                      <p className="text-sm text-base-content/70">
                        This request was fulfilled
                      </p>
                      <button className="btn btn-outline btn-sm btn-primary w-full mt-2">
                        Send Thank You
                      </button>
                    </>
                  )}

                  {request.status === "cancelled" && (
                    <>
                      <div className="badge badge-error mb-3">Cancelled</div>
                      <p className="text-sm text-base-content/70">
                        This request was cancelled
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BloodRequestList;
