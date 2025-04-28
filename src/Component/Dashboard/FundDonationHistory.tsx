import { DollarSign } from "lucide-react";
import useFundDonationHistory from "../../Hooks/useFundDonationHistory";
import FundDonationList from "./FundDonation/FundDonationList";
import Loading from "../../Shared/Loadings";

const FundDonationHistory = () => {
  const { donations, loading, error, isAdmin } = useFundDonationHistory();

  // Calculate total donations
  const totalAmount = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-content mb-2">
          {isAdmin ? "All Fund Donations" : "Your Fund Donation History"}
        </h1>
        <p className="text-base-content/70">
          {isAdmin
            ? "View all financial contributions made to support blood donation programs."
            : "Track your financial contributions to blood donation programs."}
        </p>
      </div>

      {/* Statistics Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-success">
            <DollarSign size={28} className="stroke-success" />
          </div>
          <div className="stat-title">Total Donations</div>
          <div className="stat-value text-success">
            {formatCurrency(totalAmount)}
          </div>
          <div className="stat-desc">
            {isAdmin ? "All contributions" : "Your contributions"}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-figure text-primary">
            <div className="text-3xl font-bold">#</div>
          </div>
          <div className="stat-title">Donation Count</div>
          <div className="stat-value text-primary">{donations.length}</div>
          <div className="stat-desc">Total transactions</div>
        </div>
      </div>

      {/* Donation List */}
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : (
        <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-base-200">
            <h2 className="text-xl font-bold">
              {isAdmin ? "All Donations" : "Your Donations"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <FundDonationList
              donations={donations}
              loading={loading}
              error={error}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FundDonationHistory;
