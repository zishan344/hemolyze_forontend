import React from "react";
import { activeTabType } from "../../types/Dashboard/profile.type";

interface TabNavigationProps {
  activeTab: activeTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<activeTabType>>;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 sm:space-x-4">
      <button
        className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg flex-1 sm:flex-none ${
          activeTab === "details"
            ? "bg-primary text-white"
            : "bg-secondary text-gray-600"
        }`}
        onClick={() => setActiveTab("details")}>
        Details
      </button>
      <button
        className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg flex-1 sm:flex-none ${
          activeTab === "basicInfo"
            ? "bg-primary text-white"
            : "bg-secondary text-gray-600"
        }`}
        onClick={() => setActiveTab("basicInfo")}>
        Basic Info
      </button>
      <button
        className={`px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg flex-1 sm:flex-none ${
          activeTab === "security"
            ? "bg-primary text-white"
            : "bg-secondary text-gray-600"
        }`}
        onClick={() => setActiveTab("security")}>
        Security
      </button>
    </div>
  );
};

export default TabNavigation;
