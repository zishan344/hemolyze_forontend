import { useState } from "react";
import useAuthContext from "../Hooks/useAuthContext";
import ProfileHeader from "../Component/Profile/ProfileHeader";
import TabNavigation from "../Component/Profile/TabNavigation";
import ProfileContent from "../Component/Profile/ProfileContent";

const Profile = () => {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Sections */}
        <ProfileContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Profile;
