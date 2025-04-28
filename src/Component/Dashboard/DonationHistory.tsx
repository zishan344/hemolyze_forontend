import { useState, useEffect } from "react";

import FilterTab from "./DonationHistory/FilterTab";
import StatisticsCards from "./DonationHistory/StatisticsCards";
import authApiClient from "../../Service/authApiClient";
import {
  DonationHistoryApiResponse,
  DonationRecord,
  ReceivedRecord,
} from "../../types/Dashboard/DonationHistory.type";
import BloodDonatedHistory from "./DonationHistory/BloodDonatedHistory";
import ReceivedBloodHistory from "./DonationHistory/ReceivedBloodHistory";
import useBloodDataContext from "../../Hooks/useBloodDataContext";
// Updated status values to match the API
export type DonationStatus = "pending" | "donated" | "canceled";
export type RequestStatus = "pending" | "accepted" | "completed" | "cancelled";
export type ViewType = "donated" | "received";
// Define interfaces according to actual API response

const DonationHistory = () => {
  const {
    handleUpdateAcceptedBloodRequest: handleUpdateAcceptedBloodRequested,
    loading: updateLoading,
  } = useBloodDataContext();
  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([]);
  const [receivedHistory, setReceivedHistory] = useState<ReceivedRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | DonationStatus | RequestStatus
  >("all");
  const [viewType, setViewType] = useState<ViewType>("donated");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make real API call to fetch donation history
      const response = await authApiClient.get<DonationHistoryApiResponse>(
        "/donation-history/"
      );

      // Map API responses to our component's expected format
      const donationRecords: DonationRecord[] = response.data.donations.map(
        (donation) => ({
          id: donation.id,
          recipient_name: donation.recipient_name,
          blood_group: donation.blood_request.blood_group,
          hospital_name: donation.blood_request.hospital_name,
          hospital_address: "Hospital Address", // Not provided in API response
          donation_date: donation.date,
          status: donation.donation_status,
          units_donated: 1, // Default value since not provided in API
          notes: "",
          request_id: donation.blood_request.id,
        })
      );

      const receivedRecords: ReceivedRecord[] = response.data.received.map(
        (received) => ({
          id: received.id,
          donor_name: received.donor_name,
          blood_group: received.blood_request.blood_group,
          hospital_name: received.blood_request.hospital_name,
          hospital_address: "Hospital Address", // Not provided in API response
          received_date: received.date,
          status: received.donation_status,
          units_received: 1, // Default value since not provided in API
          notes: "",
          blood_request: {
            id: received.blood_request.id,
            blood_group: received.blood_request.blood_group,
            hospital_name: received.blood_request.hospital_name,
            status: received.blood_request.status,
            date: received.blood_request.date,
          },
        })
      );
      setDonationHistory(donationRecords);
      setReceivedHistory(receivedRecords);
    } catch (error) {
      console.error("Error fetching donation history:", error);
      setError("Failed to load history data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle donataion status
  const handleUpdateAcceptedBloodRequest = async (
    requestId: number,
    status: string
  ) => {
    try {
      await handleUpdateAcceptedBloodRequested(requestId, status);
    } catch (err: any) {
      console.error("Error updating accepted blood request:", err);
    }
  };

  // Get filtered data based on active filter and view type
  const getFilteredData = () => {
    switch (viewType) {
      case "donated":
        return activeFilter === "all"
          ? donationHistory
          : donationHistory.filter((item) => item.status === activeFilter);
      case "received":
        return activeFilter === "all"
          ? receivedHistory
          : receivedHistory.filter(
              (item) =>
                // Filter by blood_request.status for received tab
                item.blood_request && item.blood_request.status === activeFilter
            );
      default:
        return [];
    }
  };

  const filteredData = getFilteredData();

  // Get title based on view type
  const getTitle = () => {
    switch (viewType) {
      case "donated":
        return "Your Donation History";
      case "received":
        return "Blood You've Received";
      default:
        return "Blood Donation Records";
    }
  };

  // Get description based on view type
  const getDescription = () => {
    switch (viewType) {
      case "donated":
        return "Review all your blood donation activities including completed, pending, and cancelled donations.";
      case "received":
        return "Track blood donations you've received for medical treatments.";
      default:
        return "";
    }
  };
  console.log("donation history", donationHistory);
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-content mb-2">
          {getTitle()}
        </h1>
        <p className="text-base-content/70">{getDescription()}</p>
      </div>

      {/* View Type Selector */}
      <div className="mb-6">
        <div className="tabs tabs-bordered">
          <button
            className={`tab ${viewType === "donated" ? "tab-active" : ""}`}
            onClick={() => setViewType("donated")}>
            Donated Blood
          </button>
          <button
            className={`tab ${viewType === "received" ? "tab-active" : ""}`}
            onClick={() => setViewType("received")}>
            Received Blood
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <FilterTab
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        viewType={viewType}
      />

      {/* Statistics Cards */}
      {!loading && !error && (
        <StatisticsCards
          donationHistory={donationHistory}
          receivedHistory={receivedHistory}
          viewType={viewType}
        />
      )}

      {/* Content based on view type */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-bold mb-2">No records found</h3>
          <p className="text-base-content/70">
            {activeFilter === "all"
              ? `You don't have any ${
                  viewType === "donated" ? "donation" : "received blood"
                } records yet.`
              : `You don't have any ${activeFilter} ${
                  viewType === "donated" ? "donations" : "received blood"
                }.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Donated Blood View */}
          {viewType === "donated" &&
            donationHistory
              .filter(
                (donation) =>
                  activeFilter === "all" || donation.status === activeFilter
              )
              .map((donation) => (
                <BloodDonatedHistory
                  handleUpdateAcceptedBloodRequest={
                    handleUpdateAcceptedBloodRequest
                  }
                  loading={updateLoading}
                  donation={donation}
                />
              ))}

          {/* Received Blood View */}
          {viewType === "received" &&
            receivedHistory
              .filter(
                (received) =>
                  activeFilter === "all" ||
                  (received.blood_request &&
                    received.blood_request.status === activeFilter)
              )
              .map((received) => <ReceivedBloodHistory received={received} />)}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
