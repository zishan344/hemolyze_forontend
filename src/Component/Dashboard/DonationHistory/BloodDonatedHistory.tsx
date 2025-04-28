import { DonationRecord } from "../../../types/Dashboard/DonationHistory.type";
import {
  downloadCertificate,
  getBadgeClass,
  getRelativeTime,
} from "../../../utils/donationHistoryUtils";
import { Calendar, DropletIcon, Info, MapPin, User } from "lucide-react";
import { formatDate } from "../../../utils/donationUtils";
interface BloodDonatedHistoryProps {
  donation: DonationRecord;
  loading?: boolean;
  handleUpdateAcceptedBloodRequest: (
    requestId: number,
    status: string
  ) => Promise<void>;
}
const BloodDonatedHistory = ({
  donation,
  loading,
  handleUpdateAcceptedBloodRequest,
}: BloodDonatedHistoryProps) => {
  return (
    <div
      key={donation.id}
      className="card bg-base-100 shadow-md overflow-hidden">
      <div className="card-body p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Details */}
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">{donation.hospital_name}</h2>
              <div className={`badge ${getBadgeClass(donation.status)}`}>
                {donation.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-start text-sm mb-3">
                  <User size={16} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-base-content/70">
                      Recipient
                    </div>
                    <div className="font-medium">{donation.recipient_name}</div>
                  </div>
                </div>

                <div className="flex items-start text-sm mb-3">
                  <MapPin size={16} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-base-content/70">Location</div>
                    <div className="font-medium">
                      {donation.hospital_address}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start text-sm mb-3">
                  <Calendar size={16} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-base-content/70">Date</div>
                    <div className="font-medium">
                      {formatDate(donation.donation_date)}
                    </div>
                    <div className="text-xs text-base-content/60">
                      {getRelativeTime(donation.donation_date)}
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
                      {donation.blood_group} • {donation.units_donated} unit
                      {donation.units_donated !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {donation?.notes && (
              <div className="mt-4 bg-base-200 p-3 rounded-md text-sm flex items-start">
                <Info size={16} className="mr-2 text-gray-400 mt-1" />
                <div>
                  <div className="font-medium">Notes</div>
                  <div className="text-base-content/70">{donation.notes}</div>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Actions */}
          <div className="border-t lg:border-t-0 lg:border-l border-base-200 p-6 lg:w-48 flex flex-col justify-center items-center">
            <div className="text-center">
              {donation.status === "donated" && (
                <>
                  <div className="badge badge-success mb-3">Completed</div>
                  {donation.certificate_url && (
                    <button
                      className="btn btn-outline btn-sm w-full mb-2"
                      onClick={() =>
                        downloadCertificate(donation.certificate_url!)
                      }>
                      View Certificate
                    </button>
                  )}
                  <button className="btn btn-outline btn-sm btn-primary w-full">
                    Share Achievement
                  </button>
                </>
              )}

              {donation.status === "pending" && (
                <>
                  <div className="badge badge-warning mb-3">Pending</div>
                  <p className="text-sm text-base-content/70 mb-2">
                    Scheduled donation
                  </p>
                  <button
                    disabled={loading}
                    onClick={() =>
                      donation.request_id &&
                      handleUpdateAcceptedBloodRequest(
                        donation?.request_id,
                        "canceled_by_donor"
                      )
                    }
                    className="btn btn-outline btn-sm btn-error w-full">
                    {loading ? "canceling..." : "Cancel Donation"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonatedHistory;
