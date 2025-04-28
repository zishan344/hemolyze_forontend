import useAuthContext from "../Hooks/useAuthContext";
import DonationCTA from "../Component/Payment/DonationCTA";
import useDonationHistory from "../Hooks/useDonationHistory";
import Loading from "../Shared/Loadings";
import RecentActivity from "../Component/Dashboard/DashboardIndex.tsx/RecentActivity";
import StatsCards from "../Component/Dashboard/DashboardIndex.tsx/StatsCards";
import {
  activeRequests,
  livesImpacted,
  totalDonations,
  upcomingDonations as upcomingDonation,
} from "../utils/dashboard.index.utils";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { donationHistory, receivedHistory, error, loading } =
    useDonationHistory();
  const totalDonation = totalDonations(donationHistory);
  const upcomingDonations = upcomingDonation(donationHistory);
  if (loading) return <Loading />;
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
      <StatsCards
        activeRequests={activeRequests(receivedHistory)}
        livesImpacted={livesImpacted(totalDonation, receivedHistory.length)}
        totalDonations={totalDonation}
        upcomingDonations={upcomingDonations.length}
      />

      {/* Donation CTA */}
      <div className="mb-8">
        <DonationCTA
          title="Support Blood Donation Programs"
          description="Your financial contribution helps maintain blood supplies, fund donor recruitment, and ensure timely delivery to those in need."
        />
      </div>

      {/* Recent Activity & Upcoming Donations */}
      <RecentActivity
        loading={loading}
        error={error}
        donationHistory={donationHistory}
        upcomingDonations={upcomingDonations}
        receivedHistory={receivedHistory}
      />

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
