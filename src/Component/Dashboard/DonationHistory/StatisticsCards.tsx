import { Clock, DropletIcon, UserIcon } from "lucide-react";
import { DonationRecord, ReceivedRecord } from "../DonationHistory";
import { RequestRecord } from "../BloodRequests";

interface StatisticsCardsProps {
  donationHistory?: DonationRecord[];
  receivedHistory?: ReceivedRecord[];
  requestHistory?: RequestRecord[];
  viewType: "donated" | "received" | "requests";
}

const StatisticsCards = ({
  donationHistory = [],
  receivedHistory = [],
  requestHistory = [],
  viewType,
}: StatisticsCardsProps) => {
  // Render different stats based on view type
  if (viewType === "donated") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-success">
            <DropletIcon size={28} className="stroke-success" />
          </div>
          <div className="stat-title">Completed Donations</div>
          <div className="stat-value text-success">
            {donationHistory.filter((d) => d.status === "completed").length}
          </div>
          <div className="stat-desc">Lives you've helped</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-warning">
            <Clock size={28} className="stroke-warning" />
          </div>
          <div className="stat-title">Pending Donations</div>
          <div className="stat-value text-warning">
            {donationHistory.filter((d) => d.status === "pending").length}
          </div>
          <div className="stat-desc">Scheduled donations</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <DropletIcon size={28} className="stroke-primary fill-primary/20" />
          </div>
          <div className="stat-title">Total Blood Units</div>
          <div className="stat-value text-primary">
            {donationHistory.reduce(
              (total, donation) =>
                donation.status === "completed"
                  ? total + donation.units_donated
                  : total,
              0
            )}
          </div>
          <div className="stat-desc">Units you've donated</div>
        </div>
      </div>
    );
  }

  if (viewType === "received") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-success">
            <DropletIcon size={28} className="stroke-success" />
          </div>
          <div className="stat-title">Received Donations</div>
          <div className="stat-value text-success">
            {receivedHistory.filter((r) => r.status === "completed").length}
          </div>
          <div className="stat-desc">Donations received</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <UserIcon size={28} className="stroke-primary" />
          </div>
          <div className="stat-title">Unique Donors</div>
          <div className="stat-value text-primary">
            {new Set(receivedHistory.map((r) => r.donor_name)).size}
          </div>
          <div className="stat-desc">People who helped you</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <DropletIcon size={28} className="stroke-primary fill-primary/20" />
          </div>
          <div className="stat-title">Total Blood Units</div>
          <div className="stat-value text-primary">
            {receivedHistory.reduce(
              (total, record) =>
                record.status === "completed"
                  ? total + record.units_received
                  : total,
              0
            )}
          </div>
          <div className="stat-desc">Units you've received</div>
        </div>
      </div>
    );
  }

  if (viewType === "requests") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-success">
            <DropletIcon size={28} className="stroke-success" />
          </div>
          <div className="stat-title">Fulfilled Requests</div>
          <div className="stat-value text-success">
            {requestHistory.filter((r) => r.status === "completed").length}
          </div>
          <div className="stat-desc">Successful requests</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-warning">
            <Clock size={28} className="stroke-warning" />
          </div>
          <div className="stat-title">Pending Requests</div>
          <div className="stat-value text-warning">
            {requestHistory.filter((r) => r.status === "pending").length}
          </div>
          <div className="stat-desc">Awaiting donors</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <DropletIcon size={28} className="stroke-primary fill-primary/20" />
          </div>
          <div className="stat-title">Total Units Requested</div>
          <div className="stat-value text-primary">
            {requestHistory.reduce(
              (total, request) => total + request.units_needed,
              0
            )}
          </div>
          <div className="stat-desc">Units you've requested</div>
        </div>
      </div>
    );
  }

  return null;
};

export default StatisticsCards;
