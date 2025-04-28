import { useState } from "react";

import FilterTab from "./DonationHistory/FilterTab";
import StatisticsCards from "./DonationHistory/StatisticsCards";

import BloodDonatedHistory from "./DonationHistory/BloodDonatedHistory";
import ReceivedBloodHistory from "./DonationHistory/ReceivedBloodHistory";
import useBloodDataContext from "../../Hooks/useBloodDataContext";
import useDonationHistory from "../../Hooks/useDonationHistory";
import { DonationStatus, RequestStatus } from "../../types/GlobalType";
import { ViewType } from "../../types/Dashboard/DonationHistory.type";

// Updated status values to match the API

const DonationHistory = () => {
  const {
    handleUpdateAcceptedBloodRequest: handleUpdateAcceptedBloodRequested,
    loading: updateLoading,
  } = useBloodDataContext();
  const { donationHistory, receivedHistory, loading, error } =
    useDonationHistory();
  const [activeFilter, setActiveFilter] = useState<
    "all" | DonationStatus | RequestStatus
  >("all");
  const [viewType, setViewType] = useState<ViewType>("donated");

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
