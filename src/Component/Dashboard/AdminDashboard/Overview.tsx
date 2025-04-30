import { AlertCircle, DollarSign, Droplet, Users } from "lucide-react";

interface OverviewProps {
  totalUsers?: number;
  totalDonations: number;
  pendingRequests: number;
  totalFunds: number;
}
const Overview = ({
  totalUsers,
  totalDonations,
  pendingRequests,
  totalFunds,
}: OverviewProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">System Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Stat Cards */}
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-primary">
            <Users size={24} />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{totalUsers}</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-success">
            <Droplet size={24} />
          </div>
          <div className="stat-title">Blood Donations</div>
          <div className="stat-value text-success">{totalDonations}</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-warning">
            <AlertCircle size={24} />
          </div>
          <div className="stat-title">Pending Requests</div>
          <div className="stat-value text-warning">{pendingRequests}</div>
        </div>

        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-figure text-info">
            <DollarSign size={24} />
          </div>
          <div className="stat-title">Total Funds</div>
          <div className="stat-value text-info">
            ${totalFunds.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-base-200 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Recent Activity</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-base-100 rounded flex justify-between">
              <span>New user registration</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="p-2 bg-base-100 rounded flex justify-between">
              <span>Blood donation completed</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </li>
            <li className="p-2 bg-base-100 rounded flex justify-between">
              <span>Fund donation received</span>
              <span className="text-sm text-gray-500">Yesterday</span>
            </li>
            <li className="p-2 bg-base-100 rounded flex justify-between">
              <span>Emergency blood request</span>
              <span className="text-sm text-gray-500">2 days ago</span>
            </li>
          </ul>
        </div>

        <div className="flex-1 bg-base-200 p-4 rounded-lg">
          <h3 className="font-medium mb-3">System Status</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span>Server Load</span>
                <span>42%</span>
              </div>
              <progress
                className="progress progress-info"
                value="42"
                max="100"></progress>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Database Usage</span>
                <span>67%</span>
              </div>
              <progress
                className="progress progress-success"
                value="67"
                max="100"></progress>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>API Response Time</span>
                <span>28ms</span>
              </div>
              <progress
                className="progress progress-primary"
                value="28"
                max="100"></progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
