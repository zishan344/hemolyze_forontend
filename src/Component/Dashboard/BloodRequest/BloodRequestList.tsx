import { Calendar, DropletIcon, Info, MapPin, User } from "lucide-react";
import { getBadgeClass } from "../../../Global/GlobalVar";
import { RequestRecord } from "./BloodRequestType";

const BloodRequestList = ({
  filteredRequests,
}: {
  filteredRequests: RequestRecord[];
}) => {
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
                        <div className="font-medium">
                          {request.requester_name}
                        </div>
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
                  </div>

                  <div>
                    <div className="flex items-start text-sm mb-3">
                      <Calendar size={16} className="mr-2 text-gray-400 mt-1" />
                      <div>
                        <div className="text-sm text-base-content/70">
                          Request Date / Needed By
                        </div>
                        <div className="font-medium">
                          {formatDate(request.request_date)}
                        </div>
                        <div className="text-xs text-base-content/60">
                          Needed by: {formatDate(request.needed_by_date)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start text-sm">
                      <DropletIcon
                        size={16}
                        className="mr-2 text-gray-400 mt-1"
                      />
                      <div>
                        <div className="text-sm text-base-content/70">
                          Blood Type & Units
                        </div>
                        <div className="font-medium">
                          {request.blood_group} • {request.units_needed} unit
                          {request.units_needed !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {request.notes && (
                  <div className="mt-4 bg-base-200 p-3 rounded-md text-sm flex items-start">
                    <Info size={16} className="mr-2 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium">Notes</div>
                      <div className="text-base-content/70">
                        {request.notes}
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
                      <button className="btn btn-outline btn-sm btn-error w-full">
                        Cancel Request
                      </button>
                    </>
                  )}

                  {request.status === "completed" && (
                    <>
                      <div className="badge badge-success mb-3">Fulfilled</div>
                      <p className="text-sm text-base-content/70">
                        This request was fulfilled
                      </p>
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
