import { Calendar, CalendarCheck } from "lucide-react";

import {
  DonationRecord,
  ReceivedRecord,
} from "../../../types/Dashboard/DonationHistory.type";

interface RecentActivityPropsType {
  donationHistory: DonationRecord[];
  receivedHistory: ReceivedRecord[];
  error: string | null;
  loading: boolean;
  upcomingDonations: DonationRecord[];
}

const RecentActivity = ({
  donationHistory,
  receivedHistory,
  error,
  loading,
  upcomingDonations,
}: RecentActivityPropsType) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-base-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Calendar className="mr-2 stroke-primary" size={20} />
          Recent Activity
        </h2>
        <div className="divide-y divide-base-300">
          {loading ? (
            <div className="py-3 text-center">Loading activity data...</div>
          ) : error ? (
            <div className="py-3 text-center text-error">{error}</div>
          ) : donationHistory.length === 0 && receivedHistory.length === 0 ? (
            <div className="py-3 text-center">No recent activity found</div>
          ) : (
            <>
              {/* Show most recent activity first, limited to 3 items */}
              {[...donationHistory, ...receivedHistory]
                .sort((a, b) => {
                  const dateA = new Date(
                    "donation_date" in a ? a.donation_date : a.received_date
                  );
                  const dateB = new Date(
                    "donation_date" in b ? b.donation_date : b.received_date
                  );
                  return dateB.getTime() - dateA.getTime(); // Sort descending
                })
                .slice(0, 3)
                .map((record, index) => {
                  // Determine if it's a donation or received record

                  const isDonation = "donation_date" in record;
                  return (
                    <div
                      className="py-3"
                      key={`${isDonation ? "donation" : "received"}-${
                        record.id
                      }-${index}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {isDonation
                              ? `Donation ${
                                  record.status.charAt(0).toUpperCase() +
                                  record.status.slice(1)
                                }`
                              : `Blood ${
                                  record.status.charAt(0).toUpperCase() +
                                  record.status.slice(1)
                                }`}
                          </p>
                          <p className="text-sm text-base-content/70">
                            {record.hospital_name}
                          </p>
                        </div>
                        <span
                          className={`text-xs ${
                            record?.status === "donated"
                              ? "bg-success/10 text-success"
                              : record.status === "pending"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-primary/10 text-primary"
                          } px-2 py-1 rounded`}>
                          {isDonation
                            ? new Date(
                                record.donation_date
                              ).toLocaleDateString()
                            : new Date(
                                record.received_date
                              ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>

      <div className="bg-base-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <CalendarCheck className="mr-2 stroke-secondary" size={20} />
          Upcoming Donations
        </h2>
        <div className="divide-y divide-base-300">
          {loading ? (
            <div className="py-3 text-center">
              Loading scheduled donations...
            </div>
          ) : error ? (
            <div className="py-3 text-center text-error">{error}</div>
          ) : upcomingDonations.length === 0 ? (
            <div className="py-3 text-center">
              No upcoming donations scheduled
            </div>
          ) : (
            upcomingDonations.slice(0, 3).map((donation, index) => (
              <div className="py-3" key={`scheduled-${donation.id}-${index}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{donation.hospital_name}</p>
                    <p className="text-sm text-base-content/70">
                      Scheduled Blood Donation ({donation.blood_group})
                    </p>
                  </div>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                    {new Date(donation.donation_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
