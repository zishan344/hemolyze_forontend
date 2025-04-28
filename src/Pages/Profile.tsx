import { useState } from "react";
import ProfileHeader from "../Component/Profile/ProfileHeader";
import TabNavigation from "../Component/Profile/TabNavigation";
import ProfileContent from "../Component/Profile/ProfileContent";
import { activeTabType } from "../types/Dashboard/profile.type";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<activeTabType>("details");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Sections */}
        <ProfileContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Profile;
