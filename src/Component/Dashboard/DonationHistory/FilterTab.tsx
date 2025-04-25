import React from "react";
import { DonationStatus } from "../DonationHistory";

interface activeFilterType {
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<DonationStatus | "all">>;
  viewType?: "donated" | "received" | "requests";
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
        <button
          className={`tab ${activeFilter === "completed" ? "tab-active" : ""}`}
          onClick={() => setActiveFilter("completed")}>
          {viewType === "requests" ? "Fulfilled" : "Completed"}
        </button>
        <button
          className={`tab ${activeFilter === "pending" ? "tab-active" : ""}`}
          onClick={() => setActiveFilter("pending")}>
          Pending
        </button>
        <button
          className={`tab ${activeFilter === "cancelled" ? "tab-active" : ""}`}
          onClick={() => setActiveFilter("cancelled")}>
          Cancelled
        </button>
      </div>
    </div>
  );
};

export default FilterTab;
