import { Clock, DropletIcon, UserIcon } from "lucide-react";

import { RequestRecord } from "../BloodRequest/BloodRequestType";
import {
  DonationRecord,
  ReceivedRecord,
} from "../../../types/Dashboard/DonationHistory.type";

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
          <div className="stat-title">Donated</div>
          <div className="stat-value text-success">
            {donationHistory.filter((d) => d.status === "donated").length}
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
                donation.status === "donated"
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
            {receivedHistory.filter((r) => r.status === "donated").length}
          </div>
          <div className="stat-desc">Donations received</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-warning">
            <Clock size={28} className="stroke-warning" />
          </div>
          <div className="stat-title">Pending Donations</div>
          <div className="stat-value text-warning">
            {receivedHistory.filter((r) => r.status === "pending").length}
          </div>
          <div className="stat-desc">Awaiting donation</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <DropletIcon size={28} className="stroke-primary fill-primary/20" />
          </div>
          <div className="stat-title">Total Blood Units</div>
          <div className="stat-value text-primary">
            {receivedHistory.reduce(
              (total, record) =>
                record.status === "donated"
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
    // For requests view, we keep the BloodRequests component's status values
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-success">
            <DropletIcon size={28} className="stroke-success" />
          </div>
          <div className="stat-title">Completed Requests</div>
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
          <div className="stat-figure text-info">
            <UserIcon size={28} className="stroke-info" />
          </div>
          <div className="stat-title">Accepted Requests</div>
          <div className="stat-value text-info">
            {requestHistory.filter((r) => r.status === "accepted").length}
          </div>
          <div className="stat-desc">In progress</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <DropletIcon size={28} className="stroke-primary fill-primary/20" />
          </div>
          <div className="stat-title">Total Units Requested</div>
          <div className="stat-value text-primary">
            {requestHistory.reduce(
              (total, request) => total + request.required_units,
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
