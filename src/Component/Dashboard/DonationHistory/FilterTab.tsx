import React from "react";
import { DonationStatus, RequestStatus } from "../../../types/GlobalType";
import { ViewType } from "../../../types/Dashboard/DonationHistory.type";

interface activeFilterType {
  activeFilter: string;
  setActiveFilter: React.Dispatch<
    React.SetStateAction<"all" | DonationStatus | RequestStatus>
  >;
  viewType: ViewType | "requests";
}

const FilterTab = ({
  activeFilter,
  setActiveFilter,
  viewType,
}: activeFilterType) => {
  return (
    <div className="mb-6">
      <div className="tabs tabs-boxed bg-base-200 inline-flex">
        <button
          className={`tab ${activeFilter === "all" ? "tab-active" : ""}`}
          onClick={() => setActiveFilter("all")}>
          All
        </button>

        {/* Show different filters based on viewType */}
        {viewType === "received" ? (
          // Filters for Received Blood tab (blood_request.status)
          <>
            <button
              className={`tab ${
                activeFilter === "pending" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("pending")}>
              Pending
            </button>
            <button
              className={`tab ${
                activeFilter === "accepted" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("accepted")}>
              Accepted
            </button>
            <button
              className={`tab ${
                activeFilter === "completed" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("completed")}>
              Completed
            </button>
            <button
              className={`tab ${
                activeFilter === "cancelled" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("cancelled")}>
              Cancelled
            </button>
          </>
        ) : viewType === "donated" ? (
          // Filters for Donated Blood tab (donation_status)
          <>
            <button
              className={`tab ${
                activeFilter === "donated" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("donated")}>
              Donated
            </button>
            <button
              className={`tab ${
                activeFilter === "pending" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("pending")}>
              Pending
            </button>
            <button
              className={`tab ${
                activeFilter === "cancelled" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("canceled")}>
              Cancelled
            </button>
          </>
        ) : (
          // Filters for Blood Requests tab
          <>
            <button
              className={`tab ${
                activeFilter === "pending" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("pending")}>
              Pending
            </button>
            <button
              className={`tab ${
                activeFilter === "accepted" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("accepted")}>
              Accepted
            </button>
            <button
              className={`tab ${
                activeFilter === "completed" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("completed")}>
              Completed
            </button>
            <button
              className={`tab ${
                activeFilter === "cancelled" ? "tab-active" : ""
              }`}
              onClick={() => setActiveFilter("cancelled")}>
              Cancelled
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FilterTab;
