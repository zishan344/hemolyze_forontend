import {
  Activity,
  Calendar,
  CalendarCheck,
  Crown,
  Droplet,
  Users,
} from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext";
import DonationCTA from "../Component/Payment/DonationCTA";

const Dashboard = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  // Only show the dashboard overview when on the main dashboard route
  if (location.pathname !== "/dashboard") {
    return <Outlet />;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content">
          Welcome, {user?.username}
        </h1>
        <p className="text-base-content/70">
          Monitor your blood donation activities and requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <Droplet size={28} className="fill-primary/20 stroke-primary" />
          </div>
          <div className="stat-title">Total Donations</div>
          <div className="stat-value text-primary">7</div>
          <div className="stat-desc">Jan 1st - Present</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-secondary">
            <CalendarCheck size={28} className="stroke-secondary" />
          </div>
          <div className="stat-title">Scheduled</div>
          <div className="stat-value text-secondary">2</div>
          <div className="stat-desc">Upcoming donations</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-accent">
            <Activity size={28} className="stroke-accent" />
          </div>
          <div className="stat-title">Blood Requests</div>
          <div className="stat-value text-accent">12</div>
          <div className="stat-desc">Active requests</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-success">
            <Users size={28} className="stroke-success" />
          </div>
          <div className="stat-title">Lives Impacted</div>
          <div className="stat-value text-success">21</div>
          <div className="stat-desc">Estimated lives saved</div>
        </div>
      </div>

      {/* Donation CTA */}
      <div className="mb-8">
        <DonationCTA
          title="Support Blood Donation Programs"
          description="Your financial contribution helps maintain blood supplies, fund donor recruitment, and ensure timely delivery to those in need."
        />
      </div>

      {/* Premium Membership Promo */}
      <div className="bg-base-100 shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Crown size={36} className="text-amber-500 mr-3" />
            <div>
              <h2 className="text-xl font-bold">Upgrade to Premium</h2>
              <p className="text-base-content/70">
                Get priority access to blood requests and additional benefits
              </p>
            </div>
          </div>
          <a href="/dashboard/premium" className="btn btn-primary">
            View Premium Benefits
          </a>
        </div>
      </div>

      {/* Recent Activity & Upcoming Donations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Calendar className="mr-2 stroke-primary" size={20} />
            Recent Activity
          </h2>
          <div className="divide-y divide-base-300">
            <div className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Donation Completed</p>
                  <p className="text-sm text-base-content/70">
                    City Hospital Blood Bank
                  </p>
                </div>
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                  2 days ago
                </span>
              </div>
            </div>
            <div className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Request Accepted</p>
                  <p className="text-sm text-base-content/70">
                    Emergency Request for A+
                  </p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  1 week ago
                </span>
              </div>
            </div>
            <div className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Donation Completed</p>
                  <p className="text-sm text-base-content/70">
                    Red Cross Blood Drive
                  </p>
                </div>
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                  2 weeks ago
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <CalendarCheck className="mr-2 stroke-secondary" size={20} />
            Upcoming Donations
          </h2>
          <div className="divide-y divide-base-300">
            <div className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Memorial Hospital</p>
                  <p className="text-sm text-base-content/70">
                    Scheduled Blood Donation
                  </p>
                </div>
                <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                  May 5, 2025
                </span>
              </div>
            </div>
            <div className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Community Blood Drive</p>
                  <p className="text-sm text-base-content/70">Downtown Plaza</p>
                </div>
                <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                  May 20, 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact donation CTA */}
      <DonationCTA
        variant="compact"
        title="Donate to Emergency Blood Fund"
        className="mb-6"
      />
    </div>
  );
};

export default Dashboard;
