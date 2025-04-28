import { Calendar, DropletIcon, Info, MapPin, User } from "lucide-react";
import { ReceivedRecord } from "../../../types/Dashboard/DonationHistory.type";
import {
  getBadgeClass,
  getRelativeTime,
} from "../../../utils/donationHistoryUtils";
import { formatDate } from "../../../utils/donationUtils";

const ReceivedBloodHistory = ({ received }: { received: ReceivedRecord }) => {
  const receivedStatus = received.blood_request?.status;
  return (
    <div
      key={received.id}
      className="card bg-base-100 shadow-md overflow-hidden">
      <div className="card-body p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Details */}
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">{received.hospital_name}</h2>
              <div
                className={`badge ${
                  received.blood_request
                    ? getBadgeClass(received.blood_request.status as any)
                    : getBadgeClass(received.status)
                }`}>
                {received.blood_request
                  ? received.blood_request.status
                  : received.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-start text-sm mb-3">
                  <User size={16} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-base-content/70">Donor</div>
                    <div className="font-medium">{received.donor_name}</div>
                  </div>
                </div>

                <div className="flex items-start text-sm mb-3">
                  <MapPin size={16} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-base-content/70">Location</div>
                    <div className="font-medium">
                      {received.hospital_address}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start text-sm mb-3">
                  <Calendar size={16} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-base-content/70">
                      Received Date
                    </div>
                    <div className="font-medium">
                      {formatDate(received.received_date)}
                    </div>
                    <div className="text-xs text-base-content/60">
                      {getRelativeTime(received.received_date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start text-sm">
                  <DropletIcon size={16} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-base-content/70">
                      Blood Type & Units
                    </div>
                    <div className="font-medium">
                      {received.blood_group} • {received.units_received} unit
                      {received.units_received !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {received.notes && (
              <div className="mt-4 bg-base-200 p-3 rounded-md text-sm flex items-start">
                <Info size={16} className="mr-2 text-gray-400 mt-1" />
                <div>
                  <div className="font-medium">Notes</div>
                  <div className="text-base-content/70">{received.notes}</div>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Actions */}
          <div className="border-t lg:border-t-0 lg:border-l border-base-200 p-6 lg:w-48 flex flex-col justify-center items-center">
            <div className="text-center">
              {receivedStatus === "completed" && (
                <>
                  <div className="badge badge-success mb-3">Received</div>
                  <button className="btn btn-outline btn-sm btn-primary w-full">
                    Send Thank You
                  </button>
                </>
              )}

              {receivedStatus === "pending" && (
                <>
                  <div className="badge badge-warning mb-3">Pending</div>
                  <p className="text-sm text-base-content/70">
                    Awaiting donation
                  </p>
                </>
              )}

              {receivedStatus === "accepted" && (
                <>
                  <div className="badge badge-info mb-3">Accepted</div>
                  <p className="text-sm text-base-content/70 mb-2">
                    Donor confirmed
                  </p>
                  <button className="btn btn-outline btn-sm btn-success w-full">
                    Mark as Received
                  </button>
                </>
              )}

              {receivedStatus === "cancelled" && (
                <>
                  <div className="badge badge-error mb-3">Cancelled</div>
                  <p className="text-sm text-base-content/70">
                    This donation was cancelled
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedBloodHistory;
