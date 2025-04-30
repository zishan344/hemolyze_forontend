import { useEffect, useState } from "react";
import useAuthContext from "../Hooks/useAuthContext";

import { BarChart3, Users, Droplet, UserCog, DollarSign } from "lucide-react";
import Loading from "../Shared/Loadings";

import Overview from "../Component/Dashboard/AdminDashboard/Overview";
import UserManagement from "../Component/Dashboard/AdminDashboard/UserManagement";
import BloodRequestManagement from "../Component/Dashboard/AdminDashboard/BloodRequestManagement";
import DonationManagement from "../Component/Dashboard/AdminDashboard/DonationManagement";
import FundManagement from "../Component/Dashboard/AdminDashboard/FundManagement";
import authApiClient from "../Service/authApiClient";

interface Statistics {
  total_users: number;
  total_blood_donations: number;
  total_pending_requests: number;
  total_fund: number;
}

const AdminDashboard = () => {
  const { user } = useAuthContext();
  //
  // const { fetchAllDonationData, AllDonations, loading } = useDonationHistory();

  //
  const [statics, setStatics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<string>("overview");

  /* useEffect(() => {
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllDonationData();
        // await fetchAllUsers();
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };
    fetchData();
  }, []); */

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const response = await authApiClient.get("/statistics");
        setStatics(response.data);
      } catch (error) {
        console.log("fetchAllUsers error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  if (loading) return <Loading />;

  const totalDonation = statics?.total_blood_donations || 0;
  const pendingRequests = statics?.total_pending_requests || 0;
  const totalUsers = statics?.total_users;
  const totalFundAmount = statics?.total_fund || 0;

  // Components for each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "blood-requests":
        return <BloodRequestManagement />;
      case "donations":
        return <DonationManagement />;
      case "funds":
        return <FundManagement />;
      default:
        return (
          <Overview
            totalUsers={totalUsers}
            totalDonations={totalDonation}
            pendingRequests={pendingRequests}
            totalFunds={totalFundAmount}
          />
        );
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content">
          Admin Dashboard
        </h1>
        <p className="text-base-content/70">
          Welcome {user?.username} - Manage blood donations, requests, and users
        </p>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("overview")}>
          <BarChart3 size={16} className="mr-2" />
          Overview
        </button>
        <button
          className={`tab ${activeTab === "users" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("users")}>
          <Users size={16} className="mr-2" />
          Users
        </button>
        <button
          className={`tab ${
            activeTab === "blood-requests" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("blood-requests")}>
          <Droplet size={16} className="mr-2" />
          Blood Requests
        </button>
        <button
          className={`tab ${activeTab === "donations" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("donations")}>
          <UserCog size={16} className="mr-2" />
          Donations
        </button>
        <button
          className={`tab ${activeTab === "funds" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("funds")}>
          <DollarSign size={16} className="mr-2" />
          Fund Donations
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-base-100 p-6 rounded-lg shadow-md">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
