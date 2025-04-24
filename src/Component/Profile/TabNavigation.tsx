import React from "react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <div className="flex mb-6 space-x-4">
      <button
        className={`px-4 py-2 rounded-lg ${
          activeTab === "profile"
            ? "bg-primary text-white"
            : "bg-secondary text-gray-600"
        }`}
        onClick={() => setActiveTab("profile")}>
        Basic Information
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          activeTab === "details"
            ? "bg-primary text-white"
            : "bg-secondary text-gray-600"
        }`}
        onClick={() => setActiveTab("details")}>
        User Details
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
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
